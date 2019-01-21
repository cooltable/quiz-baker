import React, { useEffect, useState, Fragment } from "react";

import server from "../../utils/server";
import { Input, TextArea } from "../../Styles/Components/Input";
import { StyledAutoComplete } from "../../components/Styles/Text/autoComplete";

import ovenIcon from "../../assets/oven.svg";

const QuizForm = ({ quiz, setQuiz, ...props }) => {
  const [topics, setTopics] = useState(undefined);
  const [searchTopics, setSearchOptions] = useState(null);

  useEffect(() => {
    server.get("/quizzes/topics").then(({ data }) => {
      setTopics(data);
      setSearchOptions(data);
    });
  }, []);

  const handleChange = e => {
    let value;
    if (e.target.value.name) {
      value = e.target.value.name;
    } else {
      value = e.target.value;
    }
    setQuiz({ ...quiz, [e.target.name]: value });
  };

  const filterTopics = e => {
    setTimeout(() => {
      let results;

      if (e.query.length === 0) {
        results = [...topics];
      } else {
        results = topics.filter(topic => {
          return topic.name.toLowerCase().startsWith(e.query.toLowerCase());
        });
      }
      setSearchOptions(results);
    }, 250);
  };

  return (
    <div>
      <div style={{display: 'flex'}}>

      <div>
        <p>Title:</p>
        <Input name="title" value={quiz.title} onChange={handleChange} />
        <p>Topic:</p>
        <StyledAutoComplete
          value={quiz.topic}
          suggestions={searchTopics}
          completeMethod={filterTopics}
          placeholder="Topics"
          minLength={1}
          name="topic"
          field="name"
          onChange={handleChange}
          dropdown={true}
        />
      </div>
      <img src={ovenIcon} />
      </div>

      <p>Description:</p>
      <TextArea
        name="description"
        rows={5}
        cols={30}
        value={quiz.description}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuizForm;
