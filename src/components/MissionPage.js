import React, { useState } from "react";
import styles from "./css/Mission.module.css";

const MissionPage = () => {
    const [famSize, setFamSize] = useState(4);
    const famSizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const monthlyCost = Math.floor((400 / 12) * famSize);
    const yearlyCost = Math.floor(400 * famSize);
    const fiveYearCost = yearlyCost * 5;

    const changeFamSize = (ev) => {
        setFamSize(ev.target.value);
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageHeader}>We Can Save Your Food</h1>
            <p className={styles.subHeader}>Help the planet (and your wallet) using our all in one tool to manage your pantry, grocery list, and meal planning.</p>

            <div className={styles.introSectionContainer}>
                <div className={styles.headerImgContainer}>
                    <img className={styles.headerImg} src="/rottenFruit.jpeg" alt="a picture of rotten avocados and bananas"></img>
                </div>
                <p className={styles.textParagraph}>
                    <span className={styles.boldText}> Nearly 40% of all of our food ends up in the trash,</span> even though <span className={styles.boldText}>1 in 6 Americans face food insecurity.</span> While food waste can occur at all stages of the food production and distribution cycle
                    (unharvested crops, restaurant waste, damage during manufacturing and distribution, not meeting retailer standards for appearance),
                    about <span className={styles.boldText}>39% of food waste happens at home</span> (equivalent to <span className={styles.boldText}>42 billion pounds per year</span>).
                    But we can do something about it - and have a positive impact not just on our wallet, but our planet.
                </p>
            </div>

            <div className={styles.sectionHeaderContainer}>
                <h2 className={styles.sectionHeader}>YOUR WALLET</h2>
                <div className={styles.sectionDivider}> </div>
            </div>
            <p>
                Americans waste almost $218 billion per year on discarded food - an average of <span className={styles.boldText}>$1,600 per year for a family of four.</span> Change the family size below to see how your costs stack up:
            </p>
            <div className={styles.dropdownContainer}>Average cost of food waste for a family of 
                <form>
                    <select onChange={changeFamSize}>
                        {famSizeOptions.map((num, index) => {
                            return (
                                <option
                                    value={num}
                                    key={index}
                                    selected={num === famSize ? true : false}
                                >
                                    {num}
                                </option>
                            )
                        })}
                    </select>
                </form>
                every:
            </div>
            <div className={styles.costContainer}>
                <div className={styles.costBox}>
                    <p className={styles.costTitle}>MONTH</p>
                    <p className={styles.cost}>${monthlyCost}</p>
                </div>
                <div className={styles.costBox}>
                    <p className={styles.costTitle}>1 YEAR</p>
                    <p className={styles.cost}>${yearlyCost}</p>
                </div>
                <div className={styles.costBox}>
                    <p className={styles.costTitle}>5 YEARS</p>
                    <p className={styles.cost}>${fiveYearCost}</p>
                </div>
            </div>

            <div className={styles.sectionHeaderContainer}>
                <h2 className={styles.sectionHeader}>OUR PLANET</h2>
                <div className={styles.sectionDivider}> </div>
            </div>
            <div className={styles.planetContentContainer}>
                <div>
                    <p>
                        In addition to being expensive, reducing food waste can have a substantial impact on one of the world's most pressing issues - climate change:
                    </p>
                    <ul>
                        <li className={styles.listItems}>
                            Our food requires significant energy and water to produce. Agriculture takes up <span className={styles.boldText}>50% of U.S. land area,</span> and accounts for <span className={styles.boldText}>80% of our freshwater consumption. </span>
                            In addition, the fuel cost of transporting our food accounts for <span className={styles.boldText}>10% of our total energy budget.</span>
                        </li>
                        <li className={styles.listItems}>
                            Food production accounts for <span className={styles.boldText}>11% of the world's greenhouse gas emissions,</span> such as methane, carbon dioxide and chlorofluorocarbons.
                            In the U.S., the environmental cost of wasted food is <span className={styles.boldText}>equivalent to 37 million cars.</span>
                        </li>
                        <li className={styles.listItems}>
                            Food is the single <span className={styles.boldText}>largest component taking up space in American landfills,</span> which as it decomposes accounts for <span className={styles.boldText}>23% of our methane emissions.</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.worldImgContainer}>
                    <img className={styles.globeImg} src="/world.png" alt="a picture of the Earth in the shape of an apple"></img>
                </div>
            </div>

            <div className={styles.sectionHeaderContainer}>
                <h2 className={styles.sectionHeader}>OUR PRODUCT</h2>
                <div className={styles.sectionDivider}> </div>
            </div>
            <div className={styles.productContentContainer}>
                <div>
                    <p>
                        We want to tackle our food waste, but where do we start? We believe that in our busy lives, what we need is the right tools.
                        The Save Your Food app makes it easy to keep track of your pantry, grocery list, and meal plans all in one place.
                    </p>
                    <p><a className={styles.hyperlink} href="/mypantry">My Pantry</a> helps streamline the process of maintaining your pantry:</p>
                    <ul>
                        <li className={styles.listItems}>
                            Create a virtual copy of your pantry, and be able to search by item name and category.
                        </li>
                        <li className={styles.listItems}>
                            Get notified when food is within 7 days of expiring.
                        </li>
                        <li className={styles.listItems}>
                            Mark food you want to prioritize using.
                        </li>
                    </ul>
                    <p><a className={styles.hyperlink} href="/mymealplan">Meal Planning</a> helps you tackle your weekly food plans:</p>
                    <ul>
                        <li className={styles.listItems}>
                            Create your grocery list - and once you're done shopping, add your items to your pantry with the click of a button.
                        </li>
                        <li className={styles.listItems}>
                            Keep track of items from your pantry that you want to prioritize using, and easily delete them from your pantry once used.
                        </li>
                        <li className={styles.listItems}>
                            Create a visual schedule of your weekly meal plan to make sure your pantry items are getting used!
                        </li>
                    </ul>
                </div>
                <div className={styles.mobileImgContainer}>
                    <img className={styles.mobileImg} src="/saveYourFoodApp.gif" alt="a demonstrating mobile app functionality"></img>
                    <p className={styles.imgSubtext}>Take the same functionality on the go with our mobile app</p>
                </div>
            </div>
        </div>
        /* 
            Image & Resource Citations: 
            https://www.feedingamerica.org/our-work/our-approach/reduce-food-waste#:~:text=Each%20year%2C%20108%20billion%20pounds,food%20in%20America%20is%20wasted.
            https://www.rts.com/resources/guides/food-waste-america/
            https://www.dinnerdelivery.net/wp-content/uploads/2021/04/Earth-Day-2021-and-Food-Waste.png
            https://news.climate.columbia.edu/2019/08/23/food-waste-hidden-costs/
        */
    )
};

export default MissionPage;