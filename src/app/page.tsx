"use client";
import styles from "./page.module.css";
import PriceTrackerContainer from "@/containers/PriceTrackerContainer";
import styled from "styled-components";

const CenteredHeading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// TODO: finish moving away from css styling, add proper Layout components, consider using tailwind for styling, add theme provider, etc.
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CenteredHeading>Cryptocurrency Price Tracker</CenteredHeading>
        <PriceTrackerContainer />
      </main>
    </div>
  );
}
