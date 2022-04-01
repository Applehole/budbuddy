import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { budDummy } from "../utils/dummy";
import Logo from "../components/common/Logo";
import TabBtnOne from "../components/common/TabBtnOne";
import Bud from "../components/diary/Bud";
import PlantAddDialog from "../components/diary/PlantAddDialog";
import axios from "axios";
import { makeModal } from "../utils/errExeption";
import { curDate } from "../modules/date";
import useLoginStore from "../store/LoginStore";
const Layout = styled.div`
  .logo {
    margin-top: 1rem;
  }

  .TabBtnOne {
    margin-top: 0.3rem;
  }
`;

const BudLayout = styled.div`
  /* padding-top: 0.5rem;
  padding-bottom: 2rem; */
  width: 100%;
  margin: 0 auto;
  .card-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.8rem 0.5rem 0 0.5rem;
  }
  .cardcomponent {
    width: 50%;
  }

  .notice-pos {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .notice {
    font-size: 0.9rem;
    color: DimGrey;
  }
`;

//식물 추가 탭
const Daily = () => {
  const { isLogin } = useLoginStore();
  const [isDialog, setDialog] = useState(false);
  const [plants, setPlants] = useState([]);
  const [modalCode, setModalCode] = useState(0);

  useEffect(() => {
    if (isLogin) {
      getPlantsList();
    }
  }, [isLogin]);

  function openDialog() {
    setDialog(true);
  }

  async function getPlantsList() {
    try {
      const resData = await axios.get(process.env.REACT_APP_API_URL + "/plants");
      setPlants(resData.data.data);
    } catch (err) {
      setModalCode();
      console.log(err);
    }
  }

  async function registerBud(budName) {
    //post /plants name
    //식물 이름 유효성 검사
    //
    try {
      const payload = {
        name: budName,
      };
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/plants", payload);
      getPlantsList();
    } catch (err) {
      //alreadyExistsBudName
      setModalCode("alreadyExistsBudName");
    }

    console.log("내 식물 추가시 API 호출 코드 작성란", budName);
  }

  return (
    <Layout
      onClick={() => {
        setModalCode("");
      }}>
      {makeModal(modalCode)}
      <Logo className="logo" />
      <TabBtnOne className="TabBtnOne" tabName="내 식물" btnName="내 식물 추가" fn={openDialog} />
      <BudLayout>
        {plants.length === 0 ? (
          <div className="notice-pos">
            <div className="notice">등록된 식물이 없습니다</div>
          </div>
        ) : (
          <div className="card-wrap">
            {plants.map((v, i) => {
              const date = curDate();
              return <Bud key={v.id} src={v.src || "Dummy/diary_4.PNG"} className="cardcomponent" budName={v.name} date={date} plant_id={v.id} />;
            })}
          </div>
        )}
        {/* {budDummy.map((v, i) => {
          return <Bud key={i} src={v.src} budName={v.name} date={v.createdAt} />;
        })} */}
      </BudLayout>
      {isDialog ? <PlantAddDialog open={isDialog} closeFn={setDialog} apiFn={registerBud} /> : null}
    </Layout>
  );
};

export default Daily;