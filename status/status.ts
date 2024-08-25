// systemStatus.js
import os from 'os';

export function getSystemStatus() {
  const cpuUsage = getCpuUsage();
  const memoryUsage = getMemoryUsage();
  const networkUsage = getNetworkUsage();

  return {
    cpuUsage,
    memoryUsage,
    networkUsage,
  };
}

function getCpuUsage() {
  const cpus = os.cpus();
  let userTime = 0;
  let sysTime = 0;
  let idleTime = 0;

  cpus.forEach(cpu => {
    userTime += cpu.times.user;
    sysTime += cpu.times.sys;
    idleTime += cpu.times.idle;
  });

  const total = userTime + sysTime + idleTime;

  return {
    user: ((userTime / total) * 100).toFixed(2) + '%',
    system: ((sysTime / total) * 100).toFixed(2) + '%',
    idle: ((idleTime / total) * 100).toFixed(2) + '%',
  };
}

function getMemoryUsage() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  return {
    totalMemory: (totalMemory / (1024 ** 3)).toFixed(2) + ' GB',
    usedMemory: (usedMemory / (1024 ** 3)).toFixed(2) + ' GB',
    freeMemory: (freeMemory / (1024 ** 3)).toFixed(2) + ' GB',
    usedMemoryPercentage: ((usedMemory / totalMemory) * 100).toFixed(2) + '%',
  };
}

function getNetworkUsage() {
    const interfaces = os.networkInterfaces();
    const stats = [];
  
    for (const iface in interfaces) {
      const networkInterface = interfaces?.[iface]?.filter(net => !net.internal)?.[0];
  
      if (networkInterface) {
        stats.push({
          interface: iface,
          address: networkInterface.address,
          family: networkInterface.family,
          mac: networkInterface.mac,
        });
      }
    }

  return stats;
}


