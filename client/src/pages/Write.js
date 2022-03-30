import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import PlantManageToggle from "../components/write/PlantManageToggle";
import GrowInput from "../components/write/GrowInput";
import TextContent from "../components/write/TextContent";
import DatePicker from "../components/write/DatePicker";
import { useParams } from "react-router-dom";
const Layout = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem;
  position: relative;

  .logo {
    margin-top: 1.3rem;
  }

  .date-picker {
    margin: 1rem 0;
  }

  .manage-toggle {
    margin-left: 1rem;
    margin-top: 0.3rem;
  }
  .grow-input {
    margin-left: 1rem;
    margin-top: 0.8rem;
  }
  .text-content {
    margin-top: 1.5rem;
  }

  .bud-name {
    display: flex;
    justify-content: center;
    font-size: ${(props) => props.theme.fontWritePageLarge};
    margin: 0.6rem 0 0rem 0;
    color: DarkSlateGray;
  }
`;

const WriteBtn = styled.div`
  .btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .check-wrap {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 20px;

    .ch {
      width: 16px;
      height: 16px;
    }

    .ch-text {
      margin-left: 0.5rem;
    }
  }

  .write {
    align-self: center;
    width: 20%;
    margin-left: 0.25rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
    padding: 3px;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: background-color 0.2s ease;
  }
  .write:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Write = () => {
  const params = useParams();

  console.log(params);

  function submit(e) {
    e.preventDefault();
    console.log(e.target.date.value);
    console.log(JSON.parse(e.target.toggle.value));
    console.log(e.target.size.value); //값 입력 안하면 "" 그리고 cm 붙여줘야함
    console.log(e.target.title.value);
    console.log(e.target.photo.value); //값 입력 안하면 ""
    console.log(e.target.content.value); //값 입력 안하면 ""
    console.log(e.target.checkbox.checked); //true false
  }

  return (
    <Layout name="test" onSubmit={submit}>
      <Logo className="logo" />
      <div className="bud-name">
        <div>{`${params.name}의 일지`}</div>
      </div>
      <DatePicker className="date-picker" top={90} />
      <PlantManageToggle className="manage-toggle" />
      <GrowInput className="grow-input" />
      <TextContent className="text-content" />
      <WriteBtn>
        <div className="btn-wrapper">
          <div className="check-wrap">
            <input className="ch" type="checkbox" name="checkbox" />
            <span className="ch-text">공개하기</span>
          </div>
          <button className="write" type="submit">
            기록하기
          </button>
        </div>
      </WriteBtn>
    </Layout>
  );
};

export default Write;