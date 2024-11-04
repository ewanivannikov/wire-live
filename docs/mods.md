Разница в мотивах игрока:
sandbox - свобода(можно поделиться, несильно), для себя[нет паттерных стрелок]
editor - загадка(можно поделиться, сильно), для других[есть все стрелки]
# Mode: Песочница(Sandbox)

|Состояния уровня|Возможности игрока|Возможности системы|
|---|---|---|


# Mode: Уровень(Level)

|Состояния уровня|Возможности игрока|Возможности системы|
|---|---|---|
|1. solving|• рисование из заданного набора кистей <br>•  стирание свои стрелки <br>•  переход в состояние one checking|• описываются возможностями игрока|
|2. one checking|• можно ставить и снимать с паузы(paused) <br>•  возможность вернуться в solving|• единичный просчёт симуляции и валидация для каждого output(isValid) <br>• при валидности всех output(isChecked) уровень проверен <br>• при неудачной валидации возвращение в solving|
|3. bulk checking|• ничего нельзя делать|• просчёт нескольких симуляций без визуального ряда и проверка каждой симуляции(isChecked) <br>•  при удачной проверке всех симуляций(isCompleted) уровень завершён <br>• при неудачной проверке возвращение в solving|
|4. completed|• насладись победой|• записать данные о прохождении в сервер <br>• показ экран успешного завершения|

```mermaid
classDiagram
    class Context {
        - State state
        + setState(State)
        + request()
    }

    class State {
        + handle(Context)
    }

    class SolvingState {
        + draw()
        + eraseArrows()
        + transitionToOneChecking()
    }

    class OneCheckingState {
        + pause()
        + resume()
        + returnToSolving()
        + validateSingleOutput()
    }

    class BulkCheckingState {
        + checkMultipleSimulations()
        + returnToSolving()
    }

    class CompletedState {
        + celebrate()
        + saveProgress()
        + showCompletionScreen()
    }

    Context --> State : holds
    State <|-- SolvingState
    State <|-- OneCheckingState
    State <|-- BulkCheckingState
    State <|-- CompletedState

    %% Relations
    SolvingState --> OneCheckingState : переход
    OneCheckingState --> SolvingState : возврат при ошибке
    OneCheckingState --> BulkCheckingState : переход при успешной проверке
    BulkCheckingState --> SolvingState : возврат при ошибке
    BulkCheckingState --> CompletedState : переход при успешной проверке
```

# Mode: Редактор(Editor)
|Состояния уровня|Возможности игрока|Возможности системы|
|---|---|---|

TODO: 
1. написать getOutputArrows(хэшмап)
2. сделать StateBulkChecking
3. сделать StateCompleted
