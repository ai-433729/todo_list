import { element } from "./html-util.js";

export class TodoItemView {

    /**
     * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
     * @param {TodoItemModel} todoItem
     * @param {function({id:number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element}
     */

    createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
        const todoItemElement = todoItem.completed
            ? element`<li><input type="checkbox" class="checkbox" checked>
                        <s>${todoItem.title}</s>
                        <button class="delete">削除</button>
                    </li>`
            : element`<li><input type="checkbox" class="checkbox">
                        ${todoItem.title}
                        <button class="delete">削除</button>
                    </li>`;
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            //コールバック関数に変更
            onUpdateTodo({
                id: todoItem.id,
                conpleted: !todoItem.completed
            });
        });
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
            //コールバック関数に変更
            onDeleteTodo({
                id: todoItem.id
            });
        });
        //作成したTodoアイテムのHTML要素を返す
        return todoItemElement;
    }
}

/* TodoItemViewのcreateElementメソッドの中身はAppクラスでのHTML要素を作成する部分を元にしています。 
createElementメソッドは、TodoItemModelのインスタンスだけではなくonUpdateTodoとonDeleteTodoというリスナー関数を受け取っています。 
この受け取ったリスナー関数はそれぞれ対応するイベントがViewで発生した際に呼び出されます。 */