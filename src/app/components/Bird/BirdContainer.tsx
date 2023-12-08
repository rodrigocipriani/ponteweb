"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./BirdAnimation.css";
import BirdGif from "./BirdGif";

type NewBirdProps = {
  id: number;
  startY: number;
  animationDuration: number;
};

const MAX_BIRDS = 5;
const MIN_DURATION = 30;
const MAX_DURATION = 40;
const NEW_BIRD_CYCLE_TIME_MILISEC = 2000;
const MAX_TOP_BIRD_START_Y = 10;
const MAX_BOTTOM_BIRD_START_Y = 50;

const newBirdPropsMaker = (): NewBirdProps => ({
  id: Math.random(),
  startY:
    MAX_TOP_BIRD_START_Y +
    Math.random() * (MAX_BOTTOM_BIRD_START_Y - MAX_TOP_BIRD_START_Y),
  animationDuration:
    MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
});

export default function BirdContainer() {
  const [ready, setReady] = useState(false);
  const [birds, setBirds] = useState<NewBirdProps[]>([newBirdPropsMaker()]);

  const addBird = useCallback(() => {
    if (Math.random() < 0.5 && birds.length <= MAX_BIRDS) {
      const newBirdProps = newBirdPropsMaker();
      setBirds((state) => [...state, newBirdProps]);

      setTimeout(() => {
        setBirds((state) =>
          state.filter((bird) => bird.id !== newBirdProps.id)
        );
      }, newBirdProps.animationDuration * 1000);
    }
  }, [birds.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      addBird();
    }, NEW_BIRD_CYCLE_TIME_MILISEC);
    setReady(true);
    return () => clearInterval(interval);
  }, [addBird]);

  if (!ready) return null;

  console.log(birds);

  return (
    <div>
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="bird absolute w-full"
          style={{
            top: `${bird.startY}%`,
            animationDuration: `${bird.animationDuration}s`,
          }}
        >
          <BirdGif className="w-12 h-12" />
        </div>
      ))}
    </div>
  );
}
