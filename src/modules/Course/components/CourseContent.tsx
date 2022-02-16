import React from 'react';
import { Collapse, List } from 'antd';

// const { SubMenu } = Menu;
const { Panel } = Collapse;

export function CourseContent({ content }: Array) {
	return (
    <div>
		<Collapse ghost={false} style={{ maxWidth: '600px' }}>
    		{ content.map( ([ chap, sections ], index) => 
    			<Panel header={chap} key={index}>
      				<List
      					size="small"
      					bordered
      					dataSource={sections}
      					renderItem={item => <List.Item>{item.section}</List.Item>}
    				/>
    			</Panel>
    		)}
  		</Collapse>
      {
      // <Menu
      //   style={{ maxWidth: 450 }}
      //   mode="inline"
      // >
      //   { content.map( ([ chap, sections ], index) => 
      //       <SubMenu  title={ chap }>
      //         { sections.map(({section, url}, index) => 
      //           <Menu.Item key={ index }>section</Menu.Item> 
      //         )}
      //       </SubMenu>
      //   )}
      // </Menu>
      }
    </div>
	)
}

export default CourseContent;