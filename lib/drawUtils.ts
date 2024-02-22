// Import the types from TensorFlow models
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Keypoint } from '@tensorflow-models/pose-detection';

export const drawPose = (pose: poseDetection.Pose, ctx: CanvasRenderingContext2D) => {
  // Filter keypoints with a defined score and score greater than 0.5
  const keypoints = pose.keypoints.filter((keypoint) => keypoint.score !== undefined && keypoint.score > 0.5);

  // Define your skeleton. These pairs are indices into the keypoints array.
  const skeleton = [
    [5, 7], // Right arm (shoulder to elbow)
    [7, 9], // Right forearm (elbow to wrist)
    [6, 8], // Left arm (shoulder to elbow)
    [8, 10], // Left forearm (elbow to wrist)
    // Add other connections as needed, following the keypoint indices for your model
  ];

  // Draw lines for the skeleton
  skeleton.forEach(([i, j]) => {
    const keypoint1 = keypoints[i];
    const keypoint2 = keypoints[j];

    // Check if both points are detected and have a defined score
    if (keypoint1 && keypoint2 && keypoint1.score !== undefined && keypoint2.score !== undefined) {
      ctx.beginPath();
      ctx.moveTo(keypoint1.x, keypoint1.y);
      ctx.lineTo(keypoint2.x, keypoint2.y);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  // Draw keypoints
  keypoints.forEach((keypoint) => {
    // The score check is not necessary here anymore since we've already filtered keypoints
    const { x, y } = keypoint;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  });
};
