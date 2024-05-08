export const filters = [
  {
    id: "minExp",
    fieldName: "Experience",
    selectionOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    isMultiSelect: false,
  },
  {
    id: "location",
    fieldName: "Work Type",
    selectionOptions: ["Remote", "Hybrid", "In-office"],
    isMultiSelect: true,
  },
  {
    id: "skills",
    fieldName: "Tech Stack",
    isMultiSelect: true,
    selectionOptions: [
      "Python",
      "Java",
      "GoLang",
      "Ruby/Rails",
      "C++",
      "Kotlin",
      "Django",
      "C#",
      "GraphQL",
      "Flask",
      "Typescript",
      "AWS",
      "Javascript",
      "Rust",
      "NodeJS",
      "React",
    ],
  },
  {
    id: "minJdSalary",
    fieldName: "Minimum Base Pay Salary",
    isMultiSelect: false,
    selectionOptions: [
      "0",
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
    ],
  },
  {
    id: "jobRole",
    fieldName: "Roles",
    isMultiSelect: true,
    isGrouped: true,
    selectionOptions: [
      {
        category: "Engineering",
        option: "backend",
      },
      {
        category: "Engineering",
        option: "fullstack",
      },
      {
        category: "Engineering",
        option: "iOS",
      },
      {
        category: "Engineering",
        option: "flutter",
      },
      {
        category: "Engineering",
        option: "react native",
      },
      {
        category: "Engineering",
        option: "android",
      },
      {
        category: "Engineering",
        option: "frontend",
      },
      {
        category: "Engineering",
        option: "tech lead",
      },
      {
        category: "Engineering",
        option: "dev-ops",
      },
      {
        category: "Engineering",
        option: "data engineer",
      },
      {
        category: "Engineering",
        option: "data science",
      },
      {
        category: "Engineering",
        option: "computer-vision",
      },
      {
        category: "Engineering",
        option: "nlp",
      },
      {
        category: "Engineering",
        option: "deep-learning",
      },
      {
        category: "Engineering",
        option: "test / qa",
      },
      {
        category: "Engineering",
        option: "Web3",
      },
      {
        category: "Engineering",
        option: "sre",
      },
      {
        category: "Engineering",
        option: "data-infrastructure",
      },
      {
        category: "Design",
        option: "designer",
      },
      {
        category: "Design",
        option: "design manager",
      },
      {
        category: "Design",
        option: "graphic designer",
      },
      {
        category: "Design",
        option: "product designer",
      },
      {
        category: "Product",
        option: "product manager",
      },
      {
        category: "Operations",
        option: "Operations Manager",
      },
      {
        category: "Operations",
        option: "founder’s office/chief Of staff",
      },
      {
        category: "Sales",
        option: "sales development representative",
      },
      {
        category: "Sales",
        option: "account executive",
      },
      {
        category: "Sales",
        option: "account manager",
      },
      {
        category: "Marketing",
        option: "digital marketing manager",
      },
      {
        category: "Marketing",
        option: "growth hacker",
      },
      {
        category: "Marketing",
        option: "Marketing",
      },
      {
        category: "Marketing",
        option: "product marketing manager",
      },
      {
        category: "Other Engineering",
        option: "hardware",
      },
      {
        category: "Other Engineering",
        option: "mechanical",
      },
      {
        category: "Other Engineering",
        option: "Systems",
      },
      {
        category: "Business Analyst",
        option: "business analyst",
      },
      {
        category: "Data Analyst",
        option: "data analyst",
      },
      {
        category: "Project Manager",
        option: "project manager",
      },
      {
        category: "Management",
        option: "management",
      },
      {
        category: "Legal",
        option: "legal",
      },
      {
        category: "hr",
        option: "hr",
      },
      {
        category: "Finance",
        option: "finance",
      },
    ],
  },
];
