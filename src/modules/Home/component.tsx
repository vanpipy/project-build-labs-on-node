import React from 'react';

const Home = () => {
  const onClickMe = () => {
    alert('You have clicked already!');
  };

  return (
    <>
      <div>Web Home</div>
      <button onClick={onClickMe}>click me</button>
    </>
  )
};

export default Home;
