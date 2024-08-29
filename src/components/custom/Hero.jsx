import React from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-9 px-5 lg:px-56 mt-16'>
      <h1 className='font-extrabold text-[36px] lg:text-[50px] text-center'>
        <span className='text-[#f56551]'>
          Discover Your Next Adventure with AI:
        </span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-lg lg:text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free!</Button>
      </Link>
    </div>
  );
}

export default Hero;
