import React from "react";
import {List, Card} from 'antd';
import CampaignCard from "../../CampaignCard";

class CampaignList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const data = [
            {
                title: 'Title 1',
            },
            {
                title: 'Title 2',
            },
            {
                title: 'Title 3',
            },
            {
                title: 'Title 4',
            },
            {
                title: 'Title 5',
            },
            {
                title: 'Title 6',
            },
        ];

        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <CampaignCard/>
                    </List.Item>
                )}
            />
        )
    }
}

export default CampaignList;