import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
    _todoListView = new TodoListView();
    // 1. TodoListModelの初期化
    _todoListModel = new TodoListModel([]);

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * TodoListModelのupdateTodoメソッドを呼び出す
     * @param {string} title
     */
    handleAdd(title) {
        this._todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */

    handleUpdate({ id, completed }) {
        this._todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }) {
        this._todoListModel.deleteTodo({ id });
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        this._todoListModel.onChange(() => {

            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this._todoListModel.getTodoItems();

            //todoItemsに対応するTodoListViewを作成する
            const todoListElement = this._todoListView.createElement(todoItems, {

                //Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                //上で定義したTodoListModelのupdateTodoメソッドを呼び出す、handleUpdateを呼び出す
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },

                //Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                //上で定義したTodoListModelのdeleteTodoメソッドを呼び出す、handleDeleteを呼び出す
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                }
            });

            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);

            // アイテム数の表示を更新
            todoItemCountElement.textContent = `ToDoアイテム数： ${this._todoListModel.getTotalCount()}`;
        });

        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            //上で定義したTodoListModelの新しいTodoItemをTodoListへ追加する、handleAddを呼び出す
            this.handleAdd(inputElement.value);
            inputElement.value = "";
        });
    }
}
