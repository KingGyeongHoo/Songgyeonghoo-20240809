import { Header } from "@/components";
import { webPath } from "@/router";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { error } from "@/recoil/error";

import { ErrorComponent } from "@/pages/Error";
import { LureDealSection } from "./LureDealSection";
import { BrandDealSection } from "./BrandDealSection";
import { TimeDealSection } from "./TimeDealSection";

const TimeDeal = () => {
  const navigate = useNavigate();
  const errorComponent = useRecoilValue(error)

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

  if(errorComponent === 'time'){
    return  <ErrorComponent />
  }
  return (
      <div>
        <Header title="타임특가" isBackButtonVisible={false} />
        <section>
          <LureDealSection />
        </section>
        <section>
          <BrandDealSection onClickHandler={handleClickGoToBrandDeal} />
        </section>
        <section>
          <TimeDealSection />
        </section>
      </div>
  );
};

export default TimeDeal;
