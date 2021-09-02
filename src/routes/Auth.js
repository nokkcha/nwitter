import { authService, firebaseInstance } from "fbBase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  // onSocialClick 함수 : 소셜 로그인 처리 시키는 함수 (async 비동기 함수)
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faArchive}
        color={"white"}
        size="3x"
        style={{ marginBottom: 30 }}
      ></FontAwesomeIcon>{" "}
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;

//이렇게 해두면 자동으로 import 된다.
