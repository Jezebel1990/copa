import { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { PoolCardPros } from '../components/PoolCard';


export function Pools () {
    const [pools, setPools] = useState<PoolCardPros[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const toast = useToast();
    const {navigate} = useNavigation();

   const fetchPools = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await api.get('/pools');
            // console.log(response.data.pools)

         setPools(response.data.pools);
        } catch (error) {
            console.log(error);

         return toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500',
            });
        } finally {
         setIsLoading(false);
        }
    }, [toast]);

    useFocusEffect(
        useCallback(() => {
        fetchPools();
    }, [fetchPools])
    );

    return (
    <VStack flex={1} bgColor="gray.900">
    <Header title="Meus bolões" />
         
    <VStack mt={6} mx={5} borderBottomWidth={1}
     borderBottomColor="gray.600" p={4} mb={4}>
                
                
                <Button 
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    leftIcon={<Icon as={Octicons} name="search" color='black' size='md'></Icon>}
                    onPress={() => navigate('find')}
                />
            </VStack>

        {isLoading ? (
        <Loading />
         ) : (
            <FlatList 
                data={pools}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <PoolCard 
                        data={item} 
                         onPress={() => navigate('details', { id: item.id })}
                    />
                )}
                ListEmptyComponent={() => <EmptyPoolList />}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{ pb: 10 }}
                px={5}
            />
       )}
        </VStack>
    );
}