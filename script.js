
/* eslint-disable no-var */
// Example URL: https://learn.viblo.asia/en/courses/fundamental-information-technology-engineer-examination-fe-VolejRejNm/exams/15/en/attempt?question=10
var lang = document.location.href.split("/")[8];
if (lang !== "en" && lang !== "vi") {
  lang = document.location.href.split("/")[7]; // in case language locale is omitted
  if (lang !== "en" && lang !== "vi") {
    console.error("có lỗi gì đó rồi đại ca")
  }
}
var timeout = 1000;
var shouldAutoClick = true;
var fetchQuestions = async () => {
  try {
    const data = await fetch(
      `${
        lang === "en"
          ? "https://firebasestorage.googleapis.com/v0/b/get-started-b0608.appspot.com/o/fe-questions-full-en.json?alt=media&token=cc8f0281-bf06-4a41-892c-4bfdf63c1597"
          : "https://firebasestorage.googleapis.com/v0/b/get-started-b0608.appspot.com/o/fe-questions-full-vi.json?alt=media&token=cc8f0281-bf06-4a41-892c-4bfdf63c1597"
      }`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
        },
        method: "GET",
      }
    ).then(async (r) => {
      if (r.ok) {
        return await r.json();
      }
      return lang === "en" ? en : vi;
    });
    return data;
  } catch (err) {
    console.log(err.message);
    console.log("Đừng lo đại ca, em có backup")
    return lang === "en" ? en : vi;
  }
};

async function run() {
  console.log("bat dau vui nay :D");
  const allQuestions = [];
  const fetchRes = await fetchQuestions();
  allQuestions.push(...fetchRes);

  const questionNumberList =
    document.querySelector("div.question-list").children;

  var fromComponentQuestions = [];
  var xTag = document.querySelector("div.flex.test-view.w-full");
  var reactInternalInstanceKey = Object.keys(xTag).find((key) =>
    key.startsWith("__reactInternalInstance$")
  );
  xTag[reactInternalInstanceKey].return.memoizedProps.questions.forEach(
    (ques) => {
      const obj = Object.fromEntries(Array.from(ques));
      const choices = [];
      obj.choices.forEach((c) =>
        choices.push(Object.fromEntries(Array.from(c)))
      );
      obj.choices = choices;

      fromComponentQuestions.push(obj);
    }
  );

  if (questionNumberList.length !== fromComponentQuestions.length) {
    console.log(
      "Questions don't match: ",
      "provided: ",
      questionNumberList.length,
      ", ",
      "fetched: ",
      fromComponentQuestions.length
    );

    return;
  }

  var wait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };

  for (const questionNumber of questionNumberList) {
    // questionNumber.querySelector("a").click();

    const oldHandler = questionNumber.querySelector("a").onclick;
    questionNumber.querySelector("a").onclick = null;

    questionNumber.querySelector("a").addEventListener("click", (t) => {
      const providedAnswers = document.querySelector(
        "div.question-answers div.ant-radio-group-outline"
      ).children;

      const questionHeading = document.querySelector("div.question-heading");
      const substr = questionHeading.innerText.split(" ");
      console.log(substr[substr.length - 1] - 1);

      const question =
        fromComponentQuestions[Number(substr[substr.length - 1]) - 1];
      const questionID = question.id;
      const ans = allQuestions.find((q) => String(q.id) === String(questionID));
      if (!ans) {
        console.log(
          `There's no answer for question ${substr[substr.length - 1]}`
        );
      } else {
        const ans_order = question.choices.findIndex(
          (item) => item.id === ans.answer_id
        );
        console.log(
          `Answer for question ${substr[substr.length - 1]}: ${ans_order}`
        );
        // if (timeout) {
        //   await wait();
        // }
        if (shouldAutoClick) {
          providedAnswers[ans_order].querySelector("input").click();
        }
      }
    });
    questionNumber.querySelector("a").addEventListener("click", oldHandler);
  }

  if (!shouldAutoClick) {
    for (const questionNumber of questionNumberList) {
      questionNumber
        .querySelector("a div.question-item")
        .classList.remove("not-answer-bg");
    }
  }
}

// var cusor = document.createElement("div");
// cusor.style = "position: fixed; top: 0; right: 0; z-index:9999";
// cusor.innerHTML = `<img id="cursor" src="https://media.geeksforgeeks.org/wp-content/uploads/20200319212118/cursor2.png" width="15" height="20" />`;

// document.body.appendChild(cusor);

var div = document.createElement("div");
div.style =
  "position: fixed; top: 0; left: 0; z-index:9999; min-width:100px; min-height:100px";
div.onclick = () => {
  run();
};

document.body.appendChild(div);
