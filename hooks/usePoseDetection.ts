// usePoseDetection.ts
import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { drawPose } from '@/lib/drawUtils';

export const usePoseDetection = (videoRef: React.RefObject<HTMLVideoElement>, canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [model, setModel] = useState<poseDetection.PoseDetector | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend('webgl');
      const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
      const loadedModel = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const detect = async () => {
      if (model && videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const poses = await model.estimatePoses(video);
          console.log(poses);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          if (poses.length > 0) {
            drawPose(poses[0], ctx);
          }
        }
      }
      requestAnimationFrame(detect);
    };

    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        detect();
      };
    }
  }, [model, videoRef, canvasRef]);
};
