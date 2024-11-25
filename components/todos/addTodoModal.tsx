import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/modal";

export default function AddTodoModal({
  setShowModal,
  setNewTodoInput,
  setSubTitle,
  addButtonHandle,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setNewTodoInput: Dispatch<SetStateAction<string>>;
  setSubTitle: Dispatch<SetStateAction<string>>;
  addButtonHandle: () => Promise<void>;
}) {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="w-80 bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-white">
        <h2 className="text-lg font-semibold">새 할일 만들기</h2>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            할일
          </label>
          <input
            onChange={(e) => setNewTodoInput(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-700 text-white"
            id="title"
            type="text"
            placeholder="할일 제목 입력"
          />
        </div>

        <div>
          <label
            htmlFor="subtitle"
            className="block text-sm font-medium text-gray-300"
          >
            내용
          </label>
          <input
            onChange={(e) => setSubTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-700 text-white"
            id="subtitle"
            type="text"
            placeholder="내용 입력"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            취소
          </button>
          <button
            onClick={addButtonHandle}
            className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-md focus:outline-none"
          >
            만들기
          </button>
        </div>
      </div>
    </Modal>
  );
}
