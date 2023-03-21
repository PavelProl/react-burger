import { store } from "../store";
import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// Actions
import { TIngredientActions } from "../actions/constructor";
import { TGetIngredientsActions } from "../actions/ingredients";
import { TGetOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";

// описываем все ветви состояния с помощью вспомогательного типа ReturnType
export type RootState = ReturnType<typeof store.getState>;

// типизируем метод dispatch для проверки на валидность отправляемого экшена
// временно оставил закомментированным вариант типизации
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>

// типизируем все экшены приложения
type TApplicationActions =
    | TIngredientActions
    | TGetIngredientsActions
    | TGetOrderActions
    | TUserActions
;

// типизируем thunk'и
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, never, TApplicationActions>
>;
