const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => (
  <p>
    <b>
      Number of exercises{" "}
      {parts.reduce((sum, part) => {
        return (sum += part.exercises);
      }, 0)}
    </b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const results = [];
  parts.forEach((part) => results.push(<Part part={part} key={part.id} />));
  return results;
};

const Chapter = ({ course }) => (
  <div key={course.id}>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Course = ({ courses }) => {
  const results = [];
  courses.forEach((course) =>
    results.push(<Chapter course={course} key={course.id} />)
  );
  return results;
};

export default Course;
