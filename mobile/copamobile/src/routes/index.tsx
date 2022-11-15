import { NavigationContainer} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';
import { Box } from 'native-base';

import { User } from 'phosphor-react-native';

export function Routes() {
    const { user } = useAuth();

    return (
        <Box flex={1} bg="gray.900">
        <NavigationContainer>
          {User.name ? <AppRoutes /> : <SignIn/>}
        </NavigationContainer>
        </Box>
    )
};