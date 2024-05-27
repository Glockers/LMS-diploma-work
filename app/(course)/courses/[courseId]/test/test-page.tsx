'use client';
import { BarChart, ChevronRight, Link, Loader2, Timer } from 'lucide-react';
import React from 'react';
import { differenceInSeconds } from 'date-fns';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from './_components/card';
import { Button } from '@/components/ui/button';
import { cn, formatTimeDelta } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Question, TestResult, TestOption } from './types';
import MCQCounter from './_components/MCQCounter';
import { Statistics } from './statistic';
import { Server } from '@/lib/axios';

type Props = {
  testOptions: TestOption;
  questions: Question[];
};

export function Test({ testOptions, questions }: Props) {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState<boolean>(
    testOptions.passedTest ? testOptions.passedTest.isCompleted : false
  );
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());

  const currentQuestion = React.useMemo(() => {
    return questions[questionIndex];
  }, [questionIndex, questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return currentQuestion.options;
  }, [currentQuestion]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    if (selectedChoice === questions[questionIndex].answer - 1) {
      setStats((stats) => ({
        ...stats,
        correct_answers: stats.correct_answers + 1
      }));
      toast.success('Ответ верный!');
    } else {
      setStats((prev) => ({
        ...stats,
        wrong_answers: prev.wrong_answers + 1
      }));
      toast.error('Ответ не правильный');
    }

    if (questionIndex === questions.length - 1) {
      endTest();
      return;
    }
    setQuestionIndex((questionIndex) => questionIndex + 1);
  }, [questionIndex, questions.length, selectedChoice]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === '1') {
        setSelectedChoice(0);
      } else if (key === '2') {
        setSelectedChoice(1);
      } else if (key === '3') {
        setSelectedChoice(2);
      } else if (key === '4') {
        setSelectedChoice(3);
      } else if (key === '5') {
        setSelectedChoice(4);
      } else if (key === 'Enter') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext]);

  async function endTest() {
    const payload = {
      timeStart: testOptions.timeStart,
      timeEnd: now,
      userStats: stats,
      userId: testOptions.userId,
      courseId: testOptions.course.id,
      correctAnswers: stats.correct_answers
    };

    const isResult = await Server.post('/chapter/check-test', payload);
    setHasEnded(isResult.data);
    console.log(payload);
  }

  if (hasEnded) {
    return <Statistics progress={testOptions.passedTest} />;
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Тема</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {testOptions.course.title}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span suppressHydrationWarning>
              {formatTimeDelta(
                differenceInSeconds(now, testOptions.timeStart)
              ) || 0}
            </span>
          </div>
        </div>
        <MCQCounter
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">{questions?.length}</div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? 'default' : 'outline'}
              className="justify-start w-full py-8 mb-4"
              onClick={() => {
                console.log(index);
                setSelectedChoice(index);
              }}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={hasEnded}
          onClick={() => {
            handleNext();
          }}
        >
          Cледующий вопрос <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
