const checkTimeRemaining = (timestamp: number) => {
    const timestampInSeconds = timestamp / 1000;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - timestampInSeconds;
    const timeDifferenceInMinutes = timeDifference / 60;
    console.log("timeDifferenceInMinutes", timeDifferenceInMinutes)
    return timeDifferenceInMinutes <= 5;
};

export default checkTimeRemaining;