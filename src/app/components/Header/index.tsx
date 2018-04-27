import * as React from 'react';
import { TodoActions } from 'app/actions/todos';

export namespace Header {
  export interface Props {
    addTodo: typeof TodoActions.addTodo;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    // this.handleSave = this.handleSave.bind(this);
  }

  /*handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text });
    }
  }*/

  render() {
    return (
      <header>
        <h1>Image list</h1>
      </header>
    );
  }
}
