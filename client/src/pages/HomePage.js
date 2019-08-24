import React from "react";
import Header from "../components/home/Header";
import CampaignCard from "../CampaignCard";
import CampaignList from "../components/home/CampaignList";

class HomePage extends React.Component {
    render() {
        var campaigns = new Array();
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());
        campaigns.push(new CampaignCard());

        return (
            <div className={HomePage}>
                <Header/>
                <CampaignList campaigns={campaigns}/>
            </div>
        );
    }
}

export default HomePage;