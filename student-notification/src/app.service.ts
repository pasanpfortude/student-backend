import { Injectable, OnModuleInit } from '@nestjs/common';
import { gql } from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import * as ws from 'ws';
import { EventsGateway } from './events.gateway';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private eventsService: EventsGateway, private configService: ConfigService){}

  onModuleInit() {
    this.subscribeToNotifications();
  }

 wsLink = new WebSocketLink({
  uri: this.configService.get<string>('WS_ENDPOINT'),
  options: {
    reconnect: true
  },webSocketImpl: ws  
});

 client = new ApolloClient({
  link: this.wsLink, cache: new InMemoryCache() 
});

  

  async subscribeToNotifications(){
   this.client.subscribe({
      query: gql`subscription Subscription {
      studentAdded
    }` }).subscribe((data) => {
      this.eventsService.emitStudentAddedEvent(data);
    });
  

  this.client.subscribe({
    query: gql`subscription Subscription {
    studentUpdated
  }` }).subscribe((data) => {
    this.eventsService.emitStudentUpdatedEvent(data);
  });


  this.client.subscribe({
    query: gql`subscription Subscription {
    studentRemoved
  }` }).subscribe((data) => {
    this.eventsService.emitStudentRemovedEvent(data);
  });

  this.client.subscribe({
    query: gql`subscription Subscription {
      studentsAdded
  }` }).subscribe((data) => {
    this.eventsService.emitStudentsAddedEvent(data);
  });

  }

}

