import { memo } from "react";

import { Chevron } from "@/assets";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import { useRecoilState } from "recoil";
import { brandDealQueryPage } from "@/recoil/brandDealQueryPage";

export type HeaderProps = {
  title: string;
  isBackButtonVisible: boolean;
};

export const Header = memo(({ title, isBackButtonVisible }: HeaderProps) => {
  const navigate = useNavigate();
  const [brandDealQuery, setBrandDealQuery] = useRecoilState(brandDealQueryPage)

  const handleClickBack = () => {
    setBrandDealQuery(1)
    navigate(-1);
  };

  return (
    <header className={styles.wrapper}>
      {isBackButtonVisible && (
        <div className={styles.backButton} onClick={handleClickBack}>
          <Chevron />
        </div>
      )}
      {title}
    </header>
  );
});
