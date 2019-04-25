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
    description: "When PaaS just can't cut it"
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
    description: "2GB RAM, 4GB SSD",
    cost: "$20 p/ month",
    enabled: true
  },
  {
    value: "Well-fed",
    description: "4GB RAM, 8GB SSD",
    cost: "$60 p/ month",
    enabled: true
  },
  {
    value: "Beefcake",
    description: "16GB RAM, 32GB SSD",
    cost: "$160 p/ month",
    enabled: true
  }
];
