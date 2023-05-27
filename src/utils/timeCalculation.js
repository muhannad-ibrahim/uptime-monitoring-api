/* eslint-disable no-plusplus */
const calculateDowntime = (history) => {
    let downtime = 0;
    let lastDownTime = null;

    for (let i = 0; i < history.length; i++) {
        const log = history[i];

        if (log.status === 'DOWN') {
            if (log.timestamp instanceof Date) {
                lastDownTime = log.timestamp.getTime();
            } else {
                lastDownTime = Date.now();
            }
        } else if (lastDownTime !== null) {
            if (log.timestamp instanceof Date) {
                downtime += log.timestamp.getTime() - lastDownTime;
                lastDownTime = null;
            } else {
                downtime += Date.now() - lastDownTime;
                lastDownTime = null;
            }
        }
    }

    if (lastDownTime !== null) {
        const currentTime = Date.now();
        downtime += currentTime - lastDownTime;
    }

    return downtime;
};

const calculateUptime = (history) => {
    const totalSeconds = history.length;
    const downtime = calculateDowntime(history);
    const uptime = (totalSeconds - downtime / 1000) / totalSeconds;
    return uptime * 100;
};

const calculateAvailability = (totalSeconds, downtime) => {
    const uptimeSeconds = totalSeconds - downtime / 1000;
    const availability = uptimeSeconds / totalSeconds;
    return availability * 100;
};

const calculateOutages = (history) => {
    let outages = 0;
    let outageStartTime = null;

    for (let i = 0; i < history.length; i++) {
        const log = history[i];

        if (log.status === 'DOWN') {
            if (!outageStartTime) {
                outageStartTime = log.timestamp;
            }
        } else if (outageStartTime) {
            const outageDuration = log.timestamp - outageStartTime;
            if (outageDuration >= 60000) { // set the minimum outage duration to 1 minute (60000 ms)
                outages++;
            }
            outageStartTime = null;
        }
    }

    if (outageStartTime) {
        const outageDuration = Date.now() - outageStartTime;
        if (outageDuration >= 60000) {
            outages++;
        }
    }

    return outages;
};

const calculateAverageResponseTime = (history, lastResponseTime) => {
    const responseTimes = history
        .filter((log) => log.status === 'UP')
        .map((log) => log.responseTime);

    if (lastResponseTime !== undefined && lastResponseTime !== null) {
        responseTimes.push(lastResponseTime);
    }
    const sum = responseTimes.reduce((acc, curr) => acc + curr, 0);
    const avg = responseTimes.length > 0 ? sum / responseTimes.length : 0;
    return avg;
};

module.exports = {
    calculateDowntime,
    calculateUptime,
    calculateAvailability,
    calculateOutages,
    calculateAverageResponseTime,
};
