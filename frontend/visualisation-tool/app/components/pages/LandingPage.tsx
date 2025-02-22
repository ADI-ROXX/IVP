"use client";
import React from "react";
import { BackgroundLines } from "../ui/background-lines";
import Navbar from "./Navbar";
import HeroSection from "../ui/hero-section";
import CodeBlocks from "../ui/codeblocks";
import { FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div>
      <BackgroundLines>
        <Navbar />
        <HeroSection />
      </BackgroundLines>
      <div className="bg-black min-h-[100vh] pb-1 mt-[-4rem]">
        <CodeBlocks
          position="lg:flex lg:flex-row-reverse"
          heading={
            <div className="text-4xl font-semibold mt-2">
              Start <span className="span1">Coding </span>
              <br />
              <span className="span1">in Seconds</span>
            </div>
          }
          subheading={
            <div className="font-[500] text-richblack-100 leading-6">
              Go ahead, give it a try. Our hands-on learning environment means
              you'll be writing real code from your very first lesson.
            </div>
          }
          ctnbtn1={{
            linkto: "/playground",
            content: "Playground",
            active: true,
          }}
          ctnbtn2={{
            linkto: "/",
            content: "Learn More",
            active: false,
          }}
          codeblock={`from sklearn.svm import SVC  
                    from sklearn.datasets import load_iris  
                    from sklearn.model_selection import train_test_split  
                    from sklearn.metrics import accuracy_score  
                    X, y = load_iris(return_X_y=True)  
                    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)  
                    model = SVC()  
                    model.fit(X_train, y_train)  
                    accuracy_score(y_test, model.predict(X_test))
                    print(accuracy_score)
                    `}
          codeColor="text-yellow-500"
          backgroundGradient="bg-[linear-gradient(123.77deg,_#8A2BE2_-6.46%,_#FFA500_59.04%,_#F8F8FF_124.53%)]"
        />
        <CodeBlocks
          position="lg:flex lg:flex-row"
          heading={
            <div className="text-4xl font-semibold mt-2">
              Start <span className="span1">Coding </span>
              <br />
              <span className="span1">in Seconds</span>
            </div>
          }
          subheading={
            <div className="font-[500] text-richblack-100 leading-6">
              Go ahead, give it a try. Our hands-on learning environment means
              you'll be writing real code from your very first lesson.
            </div>
          }
          ctnbtn1={{
            linkto: "/learn",
            content: "Start Learning",
            active: true,
          }}
          ctnbtn2={{
            linkto: "/",
            content: `Learn More`,
            active: false,
          }}
          codeblock={`from sklearn.model_selection import train_test_split
                        from sklearn.ensemble import RandomForestClassifier
                        from sklearn.metrics import accuracy_score
                        from sklearn.datasets import load_iris
                        X, y = load_iris(return_X_y=True)
                        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
                        model = RandomForestClassifier(n_estimators=100)
                        model.fit(X_train, y_train)
                        y_pred = model.predict(X_test)
                        print("Accuracy:",accuracy_score(y_test, y_pred))`}
          codeColor="text-blue-500"
          backgroundGradient="bg-[linear-gradient(118.19deg,_#1FA2FF_-3.62%,_#12D8FA_50.44%,_#A6FFCB_104.51%)]"
        />
      </div>
      <div className="order-t-2 bg-black text-white text-center py-2 text-lg">
        Made with ❤️ by Team 1 - ISTP
      </div>
    </div>
  );
}
