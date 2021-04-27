import React from 'react';
import { title, buttonfaq, text, container } from './faq.module.scss';

export default function FAQ() {
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isToggleOn: true };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState((state) => ({
        isToggleOn: !state.isToggleOn,
      }));
    }
    render() {
      return (
        <div>
          <h1 className={title}>FAQ</h1>
          <div className={container}>
            <div className={buttonfaq} onClick={this.handleClick}>
              <h2>
                Pourquoi avoir créé Earlystay ?{' '}
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14L0.20577 0.5L15.7942 0.500002L8 14Z"
                    fill="#3668A4"
                  />
                </svg>
              </h2>
            </div>
            <div className={text}>
              {this.state.isToggleOn
                ? ''
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra egestas erat nulla nunc sagittis dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra egestas erat nulla nunc sagittis dignissim.'}
            </div>
          </div>
        </div>
      );
    }
  }
  return <Toggle />;
}
