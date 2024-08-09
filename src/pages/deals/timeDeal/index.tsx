import { Header } from "@/components";
import { webPath } from "@/router";
import { useNavigate } from "react-router-dom";

import { LureDealSection } from "./LureDealSection";
import { BrandDealSection } from "./BrandDealSection";
import { TimeDealSection } from "./TimeDealSection";

const TimeDeal = () => {
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

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
