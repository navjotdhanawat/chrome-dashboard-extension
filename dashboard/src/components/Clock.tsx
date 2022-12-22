import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context";
import moment, { MomentTimezone } from "moment-timezone";
import ReactClock from "@uiw/react-clock";
import dayjs, { DayjsTimezone } from "dayjs";
import TimezoneSelect from "react-timezone-select";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useDispatch } from "react-redux";
import { WIDGET } from "../actions";
dayjs.extend(utc);
dayjs.extend(timezone);

interface ClockCoreProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  value?: Date;
  run?: boolean;
  timezone?: string;
  isDefault?: boolean;
}

function ClockCore(props: ClockCoreProps = {}) {
  const {
    width = 140,
    height = 140,
    value,
    run = true,
    timezone = dayjs.tz.guess(),
    isDefault,
    ...svgProps
  } = props;
  const interval = useRef<NodeJS.Timeout>();
  const handHour = useRef<any>();
  const handMinute = useRef<any>();
  const handSecond = useRef<any>();
  const rotations = useRef([0, 0, 0]);

  const handleTime = () => {
    const dayjsLocal = dayjs();
    const dayjsWithTz = dayjsLocal.tz(timezone);
    const now = new Date(dayjsWithTz.format("YYYY-MM-DDTHH:mm:ss"));
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    if (seconds === 0) {
      rotations.current[0] += 1;
    }

    if (minutes === 0 && seconds === 0) {
      rotations.current[1] += 1;
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      rotations.current[2] += 1;
    }

    const secondsDeg = (seconds / 60) * 360 + rotations.current[0] * 360;
    const minutesDeg = (minutes / 60) * 360 + rotations.current[1] * 360;
    const hoursDeg =
      (hours / 12) * 360 + (minutes / 60) * 30 + rotations.current[2] * 360;

    if (handHour.current) {
      handHour.current.style.transform = `rotate(${hoursDeg}deg)`;
    }
    if (handMinute.current) {
      handMinute.current.style.transform = `rotate(${minutesDeg}deg)`;
    }
    if (handSecond.current) {
      handSecond.current.style.transform = `rotate(${secondsDeg}deg)`;
    }
  };
  useEffect(() => {
    handleTime();
    if (run) {
      interval.current = setInterval(() => handleTime(), 1000);
    } else if (interval.current) {
      console.log("Cleanup started...");
      clearInterval(interval.current);
      interval.current = undefined;
    }

    return () => {
      console.log("Cleanup...");
      if (interval.current) {
        console.log("Cleanup started...");
        clearInterval(interval.current);
        interval.current = undefined;
      }
    };
  }, [run]);

  return (
    <svg
      className="u-clock"
      viewBox="0 0 100 100"
      color="#212121"
      fill="currentColor"
      width={width}
      height={height}
      {...svgProps}
    >
      <g className="u-clock-marks">
        {[...Array(12)].map((_, idx) => (
          <line
            key={idx}
            stroke="currentColor"
            opacity={0.7}
            strokeWidth={1}
            transform={`rotate(${30 * idx})`}
            strokeLinecap="round"
            x1="50"
            y1="5"
            x2="50"
            y2="10"
          />
        ))}
      </g>
      <line
        ref={handHour}
        stroke="currentColor"
        className="u-clock-hour"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="50"
        y1="25"
        x2="50"
        y2="50"
      />
      <line
        ref={handMinute}
        stroke="currentColor"
        className="u-clock-minute"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="50"
        y1="10"
        x2="50"
        y2="50"
      />
      <circle cx="50" cy="50" r="3" />
      <g
        ref={handSecond}
        className="u-clock-second"
        stroke="currentColor"
        color="#F44336"
        strokeWidth="1"
      >
        <line x1="50" y1="10" x2="50" y2="60" strokeLinecap="round" />
        <circle cx="50" cy="50" r="1.5" />
      </g>
      {!isDefault && (
        <>
          <text
            x="50%"
            y="34%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-2xs text-black dark:text-white"
          >
            {timezone
              .split("/")
              [timezone.split("/").length - 1].replaceAll("_", " ")}
          </text>
          <text
            x="50%"
            y="42%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-2xs text-black dark:text-white"
          >
            ({timezone.split("/")[0].replaceAll("_", " ")})
          </text>
        </>
      )}
    </svg>
  );
}

export type ClockProps = {
  style?: object;
  uuid?: string;
  timezone?: string;
  isDefault?: boolean;
};

const Clock: FC<ClockProps> = ({ style, uuid, timezone, isDefault }) => {
  const dispatch = useDispatch();
  const vpHeight = useContext(GlobalContext);
  const clockDimention = vpHeight * 0.25;
  const [toggleTzOption, setTzOption] = useState(false);

  const [selectedTimezone, setSelectedTimezone] = useState(
    timezone || dayjs.tz.guess()
  );

  return (
    <div>
      {toggleTzOption && !isDefault && (
        <TimezoneSelect
          className=" z-10 absolute top-1/3"
          value={selectedTimezone}
          onChange={({ value }) => {
            dispatch({
              type: WIDGET.UPDATE_CONFIG,
              payload: { uuid, timezone: value },
            });
            setSelectedTimezone(value);
            setTzOption(false);
          }}
        />
      )}

      <ClockCore
        isDefault={isDefault}
        run={!toggleTzOption}
        timezone={selectedTimezone}
        onClick={() => setTzOption(!toggleTzOption)}
        width={clockDimention - 20}
        height={clockDimention - 20}
        className={`dark:bg-black bg-white rounded-full`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          ...style,
        }}
      />
    </div>
  );
};

export default Clock;
