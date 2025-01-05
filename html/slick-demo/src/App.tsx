import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { useCallback, useEffect, useRef } from 'react';

function App() {
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true,
    prevArrow: <></>,
    nextArrow: <></>,
  };
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const pTrackRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const pTrackWidth = useRef(0);
  const thumbWidth = useRef(0);

  const mutationCallback = useCallback((mutationsList: MutationRecord[]) => {
    // 中文
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const track = mutation.target as HTMLDivElement;
        const translateX = -parseInt(track.style.transform?.substring(12) || '0');
        const percent = translateX / 225;
        const left = (pTrackWidth.current - thumbWidth.current) * percent;
        const height = Math.max(50, Math.min(50 * (1 + percent), 100));
        if (thumbRef.current) {
          thumbRef.current.style.transform = `translate3d(${left}px, 0px, 0px)`;
        }
        if (boxRef.current) {
          boxRef.current.style.height = `${height}px`;
        }
      }
    }
  }, []);
  useEffect(() => {
    trackRef.current = document.querySelector<HTMLDivElement>('.slick-track');
    const config = { attributes: true, childList: false, subtree: false };
    const obs = new MutationObserver(mutationCallback);
    obs.observe(trackRef.current as HTMLDivElement, config);
    pTrackWidth.current = pTrackRef.current?.offsetWidth ?? 0;
    thumbWidth.current = thumbRef.current?.offsetWidth ?? 0;
    return () => {
      obs.disconnect();
    };
  }, []);
  return (
    <div>
      <div className="m-box" ref={boxRef}>
        <Slider {...settings}>
          <div className="sm" style={{ width: '6vw' }}>
            <h3 className="first">1</h3>
          </div>
          <div className="sm" style={{ width: '6vw' }}>
            <h3 className="first">2</h3>
          </div>
          <div className="sm" style={{ width: '6vw' }}>
            <h3 className="first">3</h3>
          </div>
          <div className="sm" style={{ width: '6vw' }}>
            <h3 className="first">4</h3>
          </div>
          <div className="sm" style={{ width: '6vw' }}>
            <h3 className="first">5</h3>
          </div>
          <div className="lg" style={{ width: '6.66667vw' }}>
            <div className="h-box">
              <h3>6</h3>
              <h3>11</h3>
            </div>
          </div>
          <div className="lg" style={{ width: '6.66667vw' }}>
            <div className="h-box">
              <h3>7</h3>
              <h3>12</h3>
            </div>
          </div>
          <div className="lg" style={{ width: '6.66667vw' }}>
            <div className="h-box">
              <h3>8</h3>
              <h3>13</h3>
            </div>
          </div>
          <div className="lg" style={{ width: '6.66667vw' }}>
            <div className="h-box">
              <h3>9</h3>
              <h3>14</h3>
            </div>
          </div>
          <div className="lg" style={{ width: '6.66667vw' }}>
            <div className="h-box">
              <h3>10</h3>
              <h3>15</h3>
            </div>
          </div>
        </Slider>
      </div>
      <div className="track-box">
        <div className="track" ref={pTrackRef}>
          <div className="thumb" ref={thumbRef}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
