//import { Outlet } from 'react-router-dom';
//import { useCallback, useEffect } from 'react';
//import useLocalStorage from 'hooks/useLocalStorage';
//import { useDispatch, useSelector } from 'react-redux';
//import { selectCurrentToken, setCredentials } from 'features/auth/authSlice';
//import { useRefreshMutation } from 'features/auth/authApiSlice';
//import { IUser } from 'common/types/user.interface';
//import jwtDecode, { JwtPayload } from 'jwt-decode';

//const PersistLogin = () => {
//const [refresh, { isLoading }] = useRefreshMutation();
//const token = useSelector(selectCurrentToken);
//const [persist] = useLocalStorage('persist', false);
//const dispatch = useDispatch();

//const verifyRefreshToken = useCallback(async () => {
//try {
//const payload = await refresh().unwrap();
//console.log('soy payload ', payload);
//@ts-ignore
//const decodedUser: IUser = jwtDecode<JwtPayload>(payload?.accessToken);
//console.log('soy decoded ', decodedUser);
//const user = {
//email: decodedUser.email,
//firstName: decodedUser.firstName,
//permissionLevel: decodedUser.permissionLevel,
//};
//@ts-ignore
//dispatch(setCredentials({ ...payload, user }));
//} catch (err) {
//console.error(err);
//}

//if (!refresh && persist) verifyRefreshToken();
//}, []);

//useEffect(() => {
//verifyRefreshToken();
//Avoids unwanted call to verifyRefreshToken
//}, []);

//useEffect(() => {
//console.log(`isLoading: ${isLoading}`);
//console.log(`aT: ${JSON.stringify(token)}`);
//}, [isLoading, token]);

//return (
//<>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
//);
//};

//export default PersistLogin;
//
export {};
