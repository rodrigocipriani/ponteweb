"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./BirdAnimation.css";
import BirdGif from "./BirdGif";

type NewBirdProps = {
  id: number;
  startY: number;
  animationDuration: number;
};

const newBirdPropsMaker = (): NewBirdProps => ({
  id: Math.random(),
  startY: 10 + Math.random() * 40,
  animationDuration: 5 + Math.random() * 5,
});

export default function BirdContainer() {
  const [ready, setReady] = useState(false);
  const [birds, setBirds] = useState<NewBirdProps[]>([newBirdPropsMaker()]);

  const addBird = useCallback(() => {
    if (Math.random() < 0.5 && birds.length <= 5) {
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
    }, 100);
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
