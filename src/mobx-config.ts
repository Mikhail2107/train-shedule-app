// src/mobx-config.ts
import { configure } from 'mobx';

configure({
  enforceActions: "observed", // Все изменения состояния должны происходить через actions
  computedRequiresReaction: true, // Запрещает доступ к вычисляемым значениям вне реактивного контекста
  reactionRequiresObservable: true, // Предупреждает, если реакция создается без observable
  observableRequiresReaction: false, // Предупреждает о доступе к observable вне реакции
  disableErrorBoundaries: false // Позволяет MobX перехватывать исключения
});

