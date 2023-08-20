export interface UserProps {
  user: {
    node_id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    created_at: string | number;
    location: string;
    followers: string;
    following: string;
    company: string;
    type: string;
    public_repos: string;
  };
}

export interface loginInterface {
  email: string;
  password: string;
}
export interface signupInterface {
  email: string;
  password: string;
  name: string;
}
