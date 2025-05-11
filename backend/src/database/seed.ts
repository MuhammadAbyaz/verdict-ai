// src/seeder/seed.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'src/database/config';
import { COURSE_LEVEL } from 'src/constants/course-levels';
import { Course } from 'src/modules/course/entities/course.entity';
import { Module } from 'src/modules/module/entities/module.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import { Option } from 'src/modules/option/entities/option.entity';
import { Test } from 'src/modules/test/entities/test.entity';

const seed = async () => {
  const dataSource = new DataSource(dataSourceOptions as any);
  await dataSource.initialize();

  const courseRepo = dataSource.getRepository(Course);
  const moduleRepo = dataSource.getRepository(Module);
  const lessonRepo = dataSource.getRepository(Lesson);
  const quizRepo = dataSource.getRepository(Quiz);
  const questionRepo = dataSource.getRepository(Question);
  const optionRepo = dataSource.getRepository(Option);
  const testRepo = dataSource.getRepository(Test);

  // Create tests (need to create them first as courses reference them)
  const test1 = testRepo.create();
  await testRepo.save(test1);

  const test2 = testRepo.create();
  await testRepo.save(test2);

  const test3 = testRepo.create();
  await testRepo.save(test3);

  // Course 1: Introduction to Law and Legal Systems
  const course1 = courseRepo.create({
    title: 'Introduction to Law and Legal Systems',
    description:
      'Provides foundational knowledge of the legal system, its history, and core concepts, aligning with the initial semesters of LLB programs.',
    level: COURSE_LEVEL.BEGINNER,
    test: test1,
  });
  await courseRepo.save(course1);

  // Course 2: Constitutional Law of Pakistan
  const course2 = courseRepo.create({
    title: 'Constitutional Law of Pakistan',
    description:
      'Delves into the constitutional framework of Pakistan, exploring its development, principles, and institutions.',
    level: COURSE_LEVEL.INTERMEDIATE,
    test: test2,
  });
  await courseRepo.save(course2);

  // Course 3: Criminal Law and Procedure
  const course3 = courseRepo.create({
    title: 'Criminal Law and Procedure',
    description:
      'Focuses on the principles of criminal law, offenses, and the procedural aspects of criminal justice in Pakistan.',
    level: COURSE_LEVEL.ADVANCE,
    test: test3,
  });
  await courseRepo.save(course3);

  // COURSE 1 MODULES
  // Module 1.1: Foundations of Law
  const module1_1 = moduleRepo.create({
    title: 'Foundations of Law',
    description: 'Understanding the basic concepts of law and its evolution.',
    order: 1,
    xp: 100,
    course: { id: course1.id },
  });
  await moduleRepo.save(module1_1);

  // Module 1.1 Lessons
  const lessons1_1 = [
    {
      title: 'What is Law?',
      content:
        'Law is a system of rules created and enforced through social or governmental institutions to regulate behavior. This lesson explores the definition and nature of law.',
      order: 1,
    },
    {
      title: 'Importance of Law in Society',
      content:
        'This lesson examines why laws are essential for maintaining order, resolving disputes, and protecting rights in a functioning society.',
      order: 2,
    },
    {
      title: 'Historical Evolution of Legal Systems',
      content:
        'An overview of how legal systems have evolved from ancient codes to modern legal frameworks, including major historical milestones.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module1_1.id } }),
  );
  await lessonRepo.save(lessons1_1);

  // Module 1.1 Quizzes
  const quiz1_1_1 = quizRepo.create({
    title: 'Quiz on Legal Definitions',
    order: 4,
    module: { id: module1_1.id },
  });
  await quizRepo.save(quiz1_1_1);

  const quiz1_1_2 = quizRepo.create({
    title: 'Quiz on Historical Milestones',
    order: 5,
    module: { id: module1_1.id },
  });
  await quizRepo.save(quiz1_1_2);

  // Module 1.2: Sources of Law
  const module1_2 = moduleRepo.create({
    title: 'Sources of Law',
    description:
      'Understanding the various origins of legal principles and rules.',
    order: 2,
    xp: 100,
    course: { id: course1.id },
  });
  await moduleRepo.save(module1_2);

  // Module 1.2 Lessons
  const lessons1_2 = [
    {
      title: 'Constitutions and Statutes',
      content:
        'This lesson covers the primary sources of law, focusing on written constitutions and legislation enacted by governmental bodies.',
      order: 1,
    },
    {
      title: 'Judicial Precedents',
      content:
        'An exploration of case law and the doctrine of precedent (stare decisis) and how court decisions become binding law.',
      order: 2,
    },
    {
      title: 'Customary and Religious Laws',
      content:
        'This lesson examines how customs, traditions, and religious principles serve as sources of law in various legal systems.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module1_2.id } }),
  );
  await lessonRepo.save(lessons1_2);

  // Module 1.2 Quizzes
  const quiz1_2_1 = quizRepo.create({
    title: 'Quiz on Sources Identification',
    order: 4,
    module: { id: module1_2.id },
  });
  await quizRepo.save(quiz1_2_1);

  const quiz1_2_2 = quizRepo.create({
    title: 'Quiz on Application of Sources',
    order: 5,
    module: { id: module1_2.id },
  });
  await quizRepo.save(quiz1_2_2);

  // Module 1.3: Legal Institutions
  const module1_3 = moduleRepo.create({
    title: 'Legal Institutions',
    description: 'Understanding the key institutions in the legal system.',
    order: 3,
    xp: 100,
    course: { id: course1.id },
  });
  await moduleRepo.save(module1_3);

  // Module 1.3 Lessons
  const lessons1_3 = [
    {
      title: 'Structure of Courts',
      content:
        'This lesson explores the hierarchical organization of courts and their jurisdiction in the legal system.',
      order: 1,
    },
    {
      title: 'Role of Judges and Lawyers',
      content:
        'An examination of the responsibilities and functions of key legal professionals in the administration of justice.',
      order: 2,
    },
    {
      title: 'Legal Aid and Public Interest Litigation',
      content:
        'This lesson covers how legal services are made accessible to disadvantaged groups and how public interest cases are pursued.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module1_3.id } }),
  );
  await lessonRepo.save(lessons1_3);

  // Module 1.3 Quizzes
  const quiz1_3_1 = quizRepo.create({
    title: 'Quiz on Court Hierarchies',
    order: 4,
    module: { id: module1_3.id },
  });
  await quizRepo.save(quiz1_3_1);

  const quiz1_3_2 = quizRepo.create({
    title: 'Quiz on Legal Roles',
    order: 5,
    module: { id: module1_3.id },
  });
  await quizRepo.save(quiz1_3_2);

  // Module 1.4: Legal Reasoning and Interpretation
  const module1_4 = moduleRepo.create({
    title: 'Legal Reasoning and Interpretation',
    description: 'Understanding how legal texts are interpreted and applied.',
    order: 4,
    xp: 100,
    course: { id: course1.id },
  });
  await moduleRepo.save(module1_4);

  // Module 1.4 Lessons
  const lessons1_4 = [
    {
      title: 'Statutory Interpretation',
      content:
        'This lesson examines the principles and methods used to interpret and apply legislative texts.',
      order: 1,
    },
    {
      title: 'Case Law Analysis',
      content:
        'An exploration of how to read, analyze, and apply judicial decisions in legal reasoning.',
      order: 2,
    },
    {
      title: 'Logical Reasoning in Law',
      content:
        'This lesson covers the application of logical principles and reasoning methods in legal argumentation.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module1_4.id } }),
  );
  await lessonRepo.save(lessons1_4);

  // Module 1.4 Quizzes
  const quiz1_4_1 = quizRepo.create({
    title: 'Quiz on Interpretation Techniques',
    order: 4,
    module: { id: module1_4.id },
  });
  await quizRepo.save(quiz1_4_1);

  const quiz1_4_2 = quizRepo.create({
    title: 'Quiz on Reasoning Applications',
    order: 5,
    module: { id: module1_4.id },
  });
  await quizRepo.save(quiz1_4_2);

  // Module 1.5: Human Rights and Fundamental Freedoms
  const module1_5 = moduleRepo.create({
    title: 'Human Rights and Fundamental Freedoms',
    description: 'Understanding core human rights concepts and protections.',
    order: 5,
    xp: 100,
    course: { id: course1.id },
  });
  await moduleRepo.save(module1_5);

  // Module 1.5 Lessons
  const lessons1_5 = [
    {
      title: 'Universal Declaration of Human Rights',
      content:
        'This lesson examines the landmark international document establishing the fundamental human rights to be universally protected.',
      order: 1,
    },
    {
      title: 'Rights in the Pakistani Constitution',
      content:
        'An overview of the fundamental rights enshrined in the Constitution of Pakistan and their scope.',
      order: 2,
    },
    {
      title: 'Enforcement Mechanisms',
      content:
        'This lesson explores how human rights are enforced through domestic and international legal frameworks.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module1_5.id } }),
  );
  await lessonRepo.save(lessons1_5);

  // Module 1.5 Quizzes
  const quiz1_5_1 = quizRepo.create({
    title: 'Quiz on Human Rights Instruments',
    order: 4,
    module: { id: module1_5.id },
  });
  await quizRepo.save(quiz1_5_1);

  const quiz1_5_2 = quizRepo.create({
    title: 'Quiz on Constitutional Rights',
    order: 5,
    module: { id: module1_5.id },
  });
  await quizRepo.save(quiz1_5_2);

  // COURSE 2 MODULES
  // Module 2.1: Historical Development
  const module2_1 = moduleRepo.create({
    title: 'Historical Development',
    description: 'Exploring the constitutional history of Pakistan.',
    order: 1,
    xp: 100,
    course: { id: course2.id },
  });
  await moduleRepo.save(module2_1);

  // Module 2.1 Lessons
  const lessons2_1 = [
    {
      title: 'Pre-Partition Constitutional History',
      content:
        'This lesson examines the constitutional developments in the Indian subcontinent prior to 1947.',
      order: 1,
    },
    {
      title: '1956, 1962, and 1973 Constitutions',
      content:
        "An overview of Pakistan's three constitutions, their key features, and the political contexts in which they were adopted.",
      order: 2,
    },
    {
      title: 'Amendments and Their Impacts',
      content:
        "This lesson analyzes significant constitutional amendments and their effects on Pakistan's legal and political system.",
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module2_1.id } }),
  );
  await lessonRepo.save(lessons2_1);

  // Module 2.1 Quizzes
  const quiz2_1_1 = quizRepo.create({
    title: 'Quiz on Constitutional Milestones',
    order: 4,
    module: { id: module2_1.id },
  });
  await quizRepo.save(quiz2_1_1);

  const quiz2_1_2 = quizRepo.create({
    title: 'Quiz on Amendments',
    order: 5,
    module: { id: module2_1.id },
  });
  await quizRepo.save(quiz2_1_2);

  // Module 2.2: Fundamental Rights
  const module2_2 = moduleRepo.create({
    title: 'Fundamental Rights',
    description: 'Understanding the constitutional rights in Pakistan.',
    order: 2,
    xp: 100,
    course: { id: course2.id },
  });
  await moduleRepo.save(module2_2);

  // Module 2.2 Lessons
  const lessons2_2 = [
    {
      title: 'Rights Guaranteed by the Constitution',
      content:
        'This lesson examines the fundamental rights enshrined in the Constitution of Pakistan.',
      order: 1,
    },
    {
      title: 'Limitations and Enforcement',
      content:
        'An overview of constitutional restrictions on rights and mechanisms for their enforcement.',
      order: 2,
    },
    {
      title: 'Role of Judiciary in Rights Protection',
      content:
        'This lesson explores how Pakistani courts have interpreted and protected fundamental rights.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module2_2.id } }),
  );
  await lessonRepo.save(lessons2_2);

  // Module 2.2 Quizzes
  const quiz2_2_1 = quizRepo.create({
    title: 'Quiz on Fundamental Rights',
    order: 4,
    module: { id: module2_2.id },
  });
  await quizRepo.save(quiz2_2_1);

  const quiz2_2_2 = quizRepo.create({
    title: 'Quiz on Judicial Interpretations',
    order: 5,
    module: { id: module2_2.id },
  });
  await quizRepo.save(quiz2_2_2);

  // Module 2.3: Federalism and Division of Powers
  const module2_3 = moduleRepo.create({
    title: 'Federalism and Division of Powers',
    description: 'Understanding the federal structure of Pakistan.',
    order: 3,
    xp: 100,
    course: { id: course2.id },
  });
  await moduleRepo.save(module2_3);

  // Module 2.3 Lessons
  const lessons2_3 = [
    {
      title: 'Federal Structure of Pakistan',
      content:
        "This lesson examines the federal design established by Pakistan's Constitution.",
      order: 1,
    },
    {
      title: 'Roles of Federal and Provincial Governments',
      content:
        'An overview of respective powers and functions of national and provincial governments.',
      order: 2,
    },
    {
      title: 'Council of Common Interests',
      content:
        'This lesson explores the constitutional body designed to harmonize federal-provincial relations.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module2_3.id } }),
  );
  await lessonRepo.save(lessons2_3);

  // Module 2.3 Quizzes
  const quiz2_3_1 = quizRepo.create({
    title: 'Quiz on Federal Principles',
    order: 4,
    module: { id: module2_3.id },
  });
  await quizRepo.save(quiz2_3_1);

  const quiz2_3_2 = quizRepo.create({
    title: 'Quiz on Power Division',
    order: 5,
    module: { id: module2_3.id },
  });
  await quizRepo.save(quiz2_3_2);

  // Module 2.4: Executive, Legislature, and Judiciary
  const module2_4 = moduleRepo.create({
    title: 'Executive, Legislature, and Judiciary',
    description: 'Understanding the three branches of government in Pakistan.',
    order: 4,
    xp: 100,
    course: { id: course2.id },
  });
  await moduleRepo.save(module2_4);

  // Module 2.4 Lessons
  const lessons2_4 = [
    {
      title: 'Powers and Functions of Each Branch',
      content:
        'This lesson examines the constitutional roles of the executive, legislature, and judiciary.',
      order: 1,
    },
    {
      title: 'Checks and Balances',
      content:
        'An overview of mechanisms through which each branch restrains the others.',
      order: 2,
    },
    {
      title: 'Separation of Powers',
      content:
        'This lesson explores the constitutional principle of dividing governmental authority.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module2_4.id } }),
  );
  await lessonRepo.save(lessons2_4);

  // Module 2.4 Quizzes
  const quiz2_4_1 = quizRepo.create({
    title: 'Quiz on Branch Functions',
    order: 4,
    module: { id: module2_4.id },
  });
  await quizRepo.save(quiz2_4_1);

  const quiz2_4_2 = quizRepo.create({
    title: 'Quiz on Checks and Balances',
    order: 5,
    module: { id: module2_4.id },
  });
  await quizRepo.save(quiz2_4_2);

  // Module 2.5: Emergency Provisions and Constitutional Amendments
  const module2_5 = moduleRepo.create({
    title: 'Emergency Provisions and Constitutional Amendments',
    description: 'Understanding extraordinary constitutional mechanisms.',
    order: 5,
    xp: 100,
    course: { id: course2.id },
  });
  await moduleRepo.save(module2_5);

  // Module 2.5 Lessons
  const lessons2_5 = [
    {
      title: 'Provisions for Emergencies',
      content:
        'This lesson examines constitutional provisions for dealing with national emergencies.',
      order: 1,
    },
    {
      title: 'Process of Constitutional Amendments',
      content:
        "An overview of the procedure for amending Pakistan's Constitution.",
      order: 2,
    },
    {
      title: 'Impact on Governance',
      content:
        "This lesson explores how emergency powers and amendments have affected Pakistan's governance.",
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module2_5.id } }),
  );
  await lessonRepo.save(lessons2_5);

  // Module 2.5 Quizzes
  const quiz2_5_1 = quizRepo.create({
    title: 'Quiz on Emergency Powers',
    order: 4,
    module: { id: module2_5.id },
  });
  await quizRepo.save(quiz2_5_1);

  const quiz2_5_2 = quizRepo.create({
    title: 'Quiz on Amendment Procedures',
    order: 5,
    module: { id: module2_5.id },
  });
  await quizRepo.save(quiz2_5_2);

  // COURSE 3 MODULES
  // Module 3.1: General Principles of Criminal Law
  const module3_1 = moduleRepo.create({
    title: 'General Principles of Criminal Law',
    description: 'Understanding the foundational concepts of criminal law.',
    order: 1,
    xp: 100,
    course: { id: course3.id },
  });
  await moduleRepo.save(module3_1);

  // Module 3.1 Lessons
  const lessons3_1 = [
    {
      title: 'Elements of Crime',
      content:
        'This lesson examines the essential components that constitute a criminal offense.',
      order: 1,
    },
    {
      title: 'Mens Rea and Actus Reus',
      content:
        'An overview of the mental and physical elements required for criminal liability.',
      order: 2,
    },
    {
      title: 'Strict Liability Offenses',
      content:
        'This lesson explores crimes that do not require proof of mental intent.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module3_1.id } }),
  );
  await lessonRepo.save(lessons3_1);

  // Module 3.1 Quizzes
  const quiz3_1_1 = quizRepo.create({
    title: 'Quiz on Crime Elements',
    order: 4,
    module: { id: module3_1.id },
  });
  await quizRepo.save(quiz3_1_1);

  const quiz3_1_2 = quizRepo.create({
    title: 'Quiz on Liability Concepts',
    order: 5,
    module: { id: module3_1.id },
  });
  await quizRepo.save(quiz3_1_2);

  // Module 3.2: Offenses Against Persons
  const module3_2 = moduleRepo.create({
    title: 'Offenses Against Persons',
    description: 'Understanding crimes that harm individuals directly.',
    order: 2,
    xp: 100,
    course: { id: course3.id },
  });
  await moduleRepo.save(module3_2);

  // Module 3.2 Lessons
  const lessons3_2 = [
    {
      title: 'Homicide and Murder',
      content:
        'This lesson examines the legal definitions and elements of killing offenses.',
      order: 1,
    },
    {
      title: 'Assault and Battery',
      content:
        'An overview of crimes involving physical attacks and threats of violence.',
      order: 2,
    },
    {
      title: 'Kidnapping and Abduction',
      content:
        'This lesson explores offenses involving the forcible taking of persons.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module3_2.id } }),
  );
  await lessonRepo.save(lessons3_2);

  // Module 3.2 Quizzes
  const quiz3_2_1 = quizRepo.create({
    title: 'Quiz on Personal Offenses',
    order: 4,
    module: { id: module3_2.id },
  });
  await quizRepo.save(quiz3_2_1);

  const quiz3_2_2 = quizRepo.create({
    title: 'Quiz on Case Studies',
    order: 5,
    module: { id: module3_2.id },
  });
  await quizRepo.save(quiz3_2_2);

  // Module 3.3: Offenses Against Property
  const module3_3 = moduleRepo.create({
    title: 'Offenses Against Property',
    description: 'Understanding crimes involving theft and property damage.',
    order: 3,
    xp: 100,
    course: { id: course3.id },
  });
  await moduleRepo.save(module3_3);

  // Module 3.3 Lessons
  const lessons3_3 = [
    {
      title: 'Theft and Robbery',
      content:
        'This lesson examines crimes involving the taking of property with and without force.',
      order: 1,
    },
    {
      title: 'Criminal Breach of Trust',
      content:
        'An overview of offenses where someone misappropriates property entrusted to them.',
      order: 2,
    },
    {
      title: 'Fraud and Cheating',
      content:
        'This lesson explores crimes involving deception for financial gain.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module3_3.id } }),
  );
  await lessonRepo.save(lessons3_3);

  // Module 3.3 Quizzes
  const quiz3_3_1 = quizRepo.create({
    title: 'Quiz on Property Offenses',
    order: 4,
    module: { id: module3_3.id },
  });
  await quizRepo.save(quiz3_3_1);

  const quiz3_3_2 = quizRepo.create({
    title: 'Quiz on Legal Definitions',
    order: 5,
    module: { id: module3_3.id },
  });
  await quizRepo.save(quiz3_3_2);

  // Module 3.4: Criminal Procedure Code (CrPC)
  const module3_4 = moduleRepo.create({
    title: 'Criminal Procedure Code (CrPC)',
    description: 'Understanding the procedural aspects of criminal cases.',
    order: 4,
    xp: 100,
    course: { id: course3.id },
  });
  await moduleRepo.save(module3_4);

  // Module 3.4 Lessons
  const lessons3_4 = [
    {
      title: 'Investigation and Arrest',
      content:
        'This lesson examines the legal procedures for criminal investigations and apprehending suspects.',
      order: 1,
    },
    {
      title: 'Bail and Remand',
      content:
        'An overview of provisions relating to temporary release and detention during trial.',
      order: 2,
    },
    {
      title: 'Trial Process',
      content:
        'This lesson explores the stages and procedures of criminal trials in Pakistan.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module3_4.id } }),
  );
  await lessonRepo.save(lessons3_4);

  // Module 3.4 Quizzes
  const quiz3_4_1 = quizRepo.create({
    title: 'Quiz on Procedural Steps',
    order: 4,
    module: { id: module3_4.id },
  });
  await quizRepo.save(quiz3_4_1);

  const quiz3_4_2 = quizRepo.create({
    title: 'Quiz on Legal Provisions',
    order: 5,
    module: { id: module3_4.id },
  });
  await quizRepo.save(quiz3_4_2);

  // Module 3.5: Evidence and Trial
  const module3_5 = moduleRepo.create({
    title: 'Evidence and Trial',
    description: 'Understanding rules of evidence and trial procedures.',
    order: 5,
    xp: 100,
    course: { id: course3.id },
  });
  await moduleRepo.save(module3_5);

  // Module 3.5 Lessons
  const lessons3_5 = [
    {
      title: 'Admissibility of Evidence',
      content:
        'This lesson examines what evidence can legally be presented in court.',
      order: 1,
    },
    {
      title: 'Examination of Witnesses',
      content:
        'An overview of procedures for questioning witnesses in criminal trials.',
      order: 2,
    },
    {
      title: 'Judgment and Sentencing',
      content:
        'This lesson explores how courts reach verdicts and determine punishments.',
      order: 3,
    },
  ].map((lesson) =>
    lessonRepo.create({ ...lesson, module: { id: module3_5.id } }),
  );
  await lessonRepo.save(lessons3_5);

  // Module 3.5 Quizzes
  const quiz3_5_1 = quizRepo.create({
    title: 'Quiz on Evidence Rules',
    order: 4,
    module: { id: module3_5.id },
  });
  await quizRepo.save(quiz3_5_1);

  const quiz3_5_2 = quizRepo.create({
    title: 'Quiz on Trial Procedures',
    order: 5,
    module: { id: module3_5.id },
  });
  await quizRepo.save(quiz3_5_2);

  // Example of Quiz Questions for the first quiz of Course 1
  const questionsForQuiz1_1_1 = [
    {
      question: 'What is the primary function of law in society?',
      order: 1,
      options: [
        'To regulate behavior and maintain social order',
        'To generate revenue for the government',
        'To increase the power of law enforcement agencies',
        'To limit individual freedoms',
      ],
      correctOptionIndex: 0,
    },
    {
      question: 'Which of the following best defines "law"?',
      order: 2,
      options: [
        'Any rule that is enforced by police',
        'A system of rules recognized by a country or community as regulating the actions of its members',
        'Orders issued by government officials',
        'Traditional practices followed by a community',
      ],
      correctOptionIndex: 1,
    },
    {
      question: 'Which statement about law is most accurate?',
      order: 3,
      options: [
        'Laws are the same in every country',
        'Laws never change once established',
        'Laws reflect social values and evolve over time',
        'Laws are only created by courts',
      ],
      correctOptionIndex: 2,
    },
  ];

  // Create quiz questions for the first quiz
  for (const questionData of questionsForQuiz1_1_1) {
    const question = questionRepo.create({
      question: questionData.question,
      order: questionData.order,
      quiz: { id: quiz1_1_1.id },
    });
    await questionRepo.save(question);

    // Create and save options
    const options = await optionRepo.save(
      questionData.options.map((text) =>
        optionRepo.create({ text, question: { id: question.id } }),
      ),
    );

    // Set the correct option
    question.correctOption = options[questionData.correctOptionIndex];
    await questionRepo.save(question);
  }

  // Create Test Questions for Course 1
  const testQuestions1 = [
    {
      question: 'Which of the following is NOT a primary source of law?',
      order: 1,
      options: [
        'Constitution',
        'Statutes',
        'News reports',
        'Judicial precedents',
      ],
      correctOptionIndex: 2,
    },
    {
      question: 'What is the doctrine of precedent?',
      order: 2,
      options: [
        'The principle that the highest court always wins',
        'The principle that lower courts must follow the decisions of higher courts',
        'The principle that all citizens are equal before the law',
        'The principle that laws must be written down',
      ],
      correctOptionIndex: 1,
    },
    {
      question: "Which court sits at the top of Pakistan's judicial hierarchy?",
      order: 3,
      options: [
        'High Court',
        'District Court',
        'Federal Shariat Court',
        'Supreme Court',
      ],
      correctOptionIndex: 3,
    },
    {
      question: 'What does the term "mens rea" refer to in legal contexts?',
      order: 4,
      options: [
        'Physical evidence',
        'Guilty mind or criminal intent',
        'Court procedures',
        'Legal defense strategy',
      ],
      correctOptionIndex: 1,
    },
    {
      question:
        'Which article of the Constitution of Pakistan deals with the fundamental right to life?',
      order: 5,
      options: ['Article 4', 'Article 9', 'Article 14', 'Article 25'],
      correctOptionIndex: 1,
    },
  ];

  // Create test questions for Course 1
  for (const questionData of testQuestions1) {
    const question = questionRepo.create({
      question: questionData.question,
      order: questionData.order,
      test: { id: test1.id },
    });
    await questionRepo.save(question);

    // Create and save options
    const options = await optionRepo.save(
      questionData.options.map((text) =>
        optionRepo.create({ text, question: { id: question.id } }),
      ),
    );

    // Set the correct option
    question.correctOption = options[questionData.correctOptionIndex];
    await questionRepo.save(question);
  }

  // Create Test Questions for Course 2
  const testQuestions2 = [
    {
      question: 'When was the current Constitution of Pakistan adopted?',
      order: 1,
      options: ['1956', '1962', '1973', '1985'],
      correctOptionIndex: 2,
    },
    {
      question:
        'Which amendment to the Constitution of Pakistan established the Federal Shariat Court?',
      order: 2,
      options: [
        'Eighth Amendment',
        'Twelfth Amendment',
        'Sixteenth Amendment',
        'Eighteenth Amendment',
      ],
      correctOptionIndex: 0,
    },
    {
      question:
        "What is the significance of the Eighteenth Amendment to Pakistan's Constitution?",
      order: 3,
      options: [
        'It established the parliamentary system',
        'It transferred significant powers from the President to the Prime Minister',
        'It devolved powers to the provinces',
        'It established the Federal Shariat Court',
      ],
      correctOptionIndex: 2,
    },
    {
      question:
        "Which of the following is NOT a fundamental right under Pakistan's Constitution?",
      order: 4,
      options: [
        'Right to fair trial',
        'Freedom of speech',
        'Free higher education',
        'Freedom of religion',
      ],
      correctOptionIndex: 2,
    },
    {
      question: "Under Pakistan's Constitution, who is the head of state?",
      order: 5,
      options: [
        'Prime Minister',
        'President',
        'Chief Justice',
        'Speaker of the National Assembly',
      ],
      correctOptionIndex: 1,
    },
  ];

  // Create test questions for Course 2
  for (const questionData of testQuestions2) {
    const question = questionRepo.create({
      question: questionData.question,
      order: questionData.order,
      test: { id: test2.id },
    });
    await questionRepo.save(question);

    // Create and save options
    const options = await optionRepo.save(
      questionData.options.map((text) =>
        optionRepo.create({ text, question: { id: question.id } }),
      ),
    );

    // Set the correct option
    question.correctOption = options[questionData.correctOptionIndex];
    await questionRepo.save(question);
  }

  // Create Test Questions for Course 3
  const testQuestions3 = [
    {
      question: 'What are the two essential elements of a crime?',
      order: 1,
      options: [
        'Verdict and sentence',
        'Investigation and arrest',
        'Mens rea and actus reus',
        'Prosecution and defense',
      ],
      correctOptionIndex: 2,
    },
    {
      question:
        'What is the difference between murder and culpable homicide in Pakistani law?',
      order: 2,
      options: [
        'There is no difference; they are the same offense',
        'Murder involves premeditation, while culpable homicide may not',
        'Murder applies only to government officials',
        'Culpable homicide only applies to accidental deaths',
      ],
      correctOptionIndex: 1,
    },
    {
      question:
        'Which of the following is NOT an element of the crime of theft?',
      order: 3,
      options: [
        'Dishonest intention',
        'Taking possession',
        'Property belonging to another',
        'Using a weapon',
      ],
      correctOptionIndex: 3,
    },
    {
      question: 'What is the primary purpose of bail in criminal proceedings?',
      order: 4,
      options: [
        'To punish the accused',
        'To find the accused guilty',
        'To ensure the accused appears for trial while allowing temporary liberty',
        'To compensate victims of crime',
      ],
      correctOptionIndex: 2,
    },
    {
      question:
        'Under Pakistani law, which type of evidence is generally NOT admissible in court?',
      order: 5,
      options: [
        'Documentary evidence',
        'Hearsay evidence',
        'Expert testimony',
        'Direct witness testimony',
      ],
      correctOptionIndex: 1,
    },
  ];

  // Create test questions for Course 3
  for (const questionData of testQuestions3) {
    const question = questionRepo.create({
      question: questionData.question,
      order: questionData.order,
      test: { id: test3.id },
    });
    await questionRepo.save(question);

    // Create and save options
    const options = await optionRepo.save(
      questionData.options.map((text) =>
        optionRepo.create({ text, question: { id: question.id } }),
      ),
    );

    // Set the correct option
    question.correctOption = options[questionData.correctOptionIndex];
    await questionRepo.save(question);
  }

  console.log('Seeding complete ✅');

  await dataSource.destroy();
};

seed().catch((err) => {
  console.error('Seeding failed ❌', err);
});
