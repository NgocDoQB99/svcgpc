import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://svcgpc.pages.dev/';
    }, 4000); // Increased time for animation

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // Slower interval for smoother progress

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="splash-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="splash-card">
        <div className="rocket-container">
            <div className="rocket">
                <div className="rocket-body">
                    <div className="rocket-window"></div>
                </div>
                <div className="rocket-fin fin-left"></div>
                <div className="rocket-fin fin-right"></div>
                <div className="rocket-flame"></div>
            </div>
        </div>
        <h1 className="title">Chuẩn bị khởi hành!</h1>
        <p className="subtitle">Đích đến: Một thiên hà mới. Hãy thắt dây an toàn, chúng ta sắp bay vào không gian mạng!</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
         <p className="redirect-info">Nếu tên lửa không cất cánh, <a href="https://svcgpc.pages.dev/">hãy dùng cổng dịch chuyển tức thời này</a>.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
