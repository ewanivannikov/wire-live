import { ContentStatus } from '../../shared';
import { Button } from '../../shared/ui/components/Button';
import { createEffect, Show } from 'solid-js';
import { user } from '../user';

export const Profile = () => {
  createEffect(() => {
    return user.state
  });
  const logOut = () => {
    user.logOut();
  };

  const logIn = () => {
    user.logIn();
  };

  return (
    <>
      <ContentStatus
        status={user.state.status}
        error={user.state.error}
      >
        <div class="profile">
          <div class="profile__avatar"></div>
          <div class="profile__name">{user.state.data.name}</div>
        </div>
      </ContentStatus>
      <Show when={user.isUnauthorized}>
        <Button onClick={logIn}>Войти</Button>
      </Show>
      <Show when={user.state.data?.name}>
        <Button onClick={logOut}>Выйти</Button>
      </Show>
    </>
  );
};
