import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import flixAiLogo from "@/app/assets/images/flix-ai-logo-new.png";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_image}>
        <Image
          src={flixAiLogo}
          alt={"Flix Ai Logo"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export default Header;
