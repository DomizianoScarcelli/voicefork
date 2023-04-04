//
//  SiriRN.m
//  frontend
//
//  Created by Domiziano Scarcelli on 02/04/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SiriRN, NSObject)
  RCT_EXTERN_METHOD(handleNearbyRestaurantsIntent: (RCTResponseSenderBlock)callback)
@end
