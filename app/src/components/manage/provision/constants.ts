export const types = [
  {
    value: "Client",
    description: "Consumer of data"
  },
  {
    value: "API",
    description: "Interface for data"
  },
  {
    value: "Lambda",
    description: "Microservice, timer job, etc."
  },
  {
    value: "Virtual Machine",
    description: "Ubuntu 18.04 LTS"
  }
];

export const languages = [
  {
    value: "Javascript",
    description: "The hipster's favorite",
    enabled: true
  },
  {
    value: "C#",
    description: "Grandpa's favorite",
    enabled: true
  },
  {
    value: "Java",
    description: "The geek's favorite",
    enabled: false
  },
  {
    value: "Python",
    description: "GSPIA's favorite",
    enabled: false
  }
];

export const serverSizes = [
  {
    value: "Scrawny",
    description: {
      RAM: "2GB",
      SSD: "4GB SSD",
      VHD: "30GB VHD"
    },
    cost: "$20 p/ month",
    enabled: true
  },
  {
    value: "Well-fed",
    description: {
      RAM: "4GB",
      SSD: "8GB SSD",
      VHD: "30GB VHD"
    },
    cost: "$60 p/ month",
    enabled: true
  },
  {
    value: "Beefcake",
    description: {
      RAM: "16GB",
      SSD: "32GB SSD",
      VHD: "30GB VHD"
    },
    cost: "$160 p/ month",
    enabled: true
  }
];
