import classes from "./home.module.css";

export default function Home() {
  return (
    <div className={classes.home}>
      <div className={classes.projectPrompt}>
        <h2 className={classes.projectTitle}>Welcome to the Phone Book App</h2>
        <p className={classes.projectDescription}>
          Welcome to your modern Phone Book app!
          <br />
          Effortlessly organize, search, and access all your important contacts
          in one place. Browse through groups, quickly find the numbers you
          need, and mark your favorites for even faster access next time.
          <br />
          <br />
          Enjoy a smooth and intuitive experience designed to make managing your
          contacts simple and enjoyable. Whether you're connecting with friends,
          family, or colleagues, our app helps you stay organized and connected
          with ease.
          <br />
          <br />
          Start exploring and make the most of your digital phone book today!
        </p>
      </div>
    </div>
  );
}
