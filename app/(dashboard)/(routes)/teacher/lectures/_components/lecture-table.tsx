'use client';
import toast from 'react-hot-toast';

export function LectureTable() {
  function test() {
    toast.success('Ты успешно сдал курс!');
  }

  return (
    <>
      <button onClick={test}>Hi</button>
    </>
  );
}
