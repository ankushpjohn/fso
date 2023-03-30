const Header = (prop) => {
  return <h1>{prop.course}</h1>;
};

const Content = (prop) => {
  const results = [];
  prop.parts.forEach((element) => {
    results.push(
      <p>
        {element.name} {element.exercises}
      </p>
    );
  });

  return <>{results}</>;
};

const Total = (prop) => {
  return (
    <p>
      Number of exercises
      {" " +
        prop.parts.reduce((sum, part) => {
          return (sum += part.exercises);
        }, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
