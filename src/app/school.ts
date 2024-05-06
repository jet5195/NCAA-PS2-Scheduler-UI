export interface School {
  tgid: number;
  name: string;
  nickname: string;
  state: string;
  conferenceName: string;
  divisionName: string;
  ncaaDivision: string;
  color: string;
  altColor: string;
  logo: string;
  userTeam: boolean;
  rivals: number[];//tgid
  xDivRival: number;//tgid
  latitude: number;
  longitude: number;
  stadiumName: string;
  stadiumCapacity: number;
  abbreviation: string;
  city: string;
}
