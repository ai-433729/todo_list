import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    /**
     * `todoItems`に対応するTodoリストのHTML要素を作成して返す
     * @param {TodoItemModel[]} todoItems TodoItemModelの配列
     * @param {TodoItemModel[]} todoI@param {function({id:number, completed: boolean})} *onUpdateTodo チェックボックスの更新イベントリスナーtems TodoItemModelの配列
     * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
     */
    createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
        const todoListElement = element`<ul></ul>`;
        // 各TodoItemモデルに対応したHTML要素を作成し、リスト要素へ追加する
        todoItems.forEach(todoItem => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createElement(todoItem, {
                onDeleteTodo,
                onUpdateTodo
            });
            todoListElement.appendChild(todoItemElement);
        });
        return todoListElement;
    }
}

/* TodoListViewのcreateElementメソッドはTodoItemViewを使ってTodoアイテムのHTML要素を作り、todoListElementへと追加していきます。 
このTodoListViewのcreateElementメソッドもonUpdateTodoとonDeleteTodoのリスナー関数を受け取ります。 
しかし、TodoListViewではこのリスナー関数をTodoItemViewにそのまま渡しています。 
なぜなら具体的なDOMイベントを発生させる要素が作られるのはTodoItemViewの中となるためです。 */